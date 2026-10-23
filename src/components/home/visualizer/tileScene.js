// Three.js scene for the home-page tile visualiser. This module is only ever
// loaded with a dynamic import(), so three.js stays out of the main bundle.

import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { gsap } from "gsap";

const EXTENT = 14; // floor width in scene units (1 unit = 24 in); edges fade into fog
const MAX_PER_SIDE = 22; // caps the tile count for small tile sizes
const THICKNESS = 0.07;
const BACKGROUND = "#e7e1d6";
const ROUGHNESS = { polished: 0.1, honed: 0.55 };
const VARIANTS = 6; // random slab crops per texture, shared between tiles
const VIEW = { radius: 7.6, height: 4.6, yaw: 0.35 };
const LIMITS = { radius: [3.5, 11], height: [1.2, 9] };

export function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

/**
 * Creates the scene inside `container`.
 * options: { texture, contrastTexture, pattern, finish, tile, grout, reducedMotion }
 *   texture: { url, natural } – natural textures show the whole image on every tile
 *   tile: { w, d } in scene units; grout: { gap, color }
 * Returns controls: setMaterial, setPattern, setFinish, setTile, setGrout,
 * setActive, mount, setInteractive, zoomBy, resetView, capture, dispose.
 */
export async function createTileScene(container, options) {
  const { reducedMotion } = options;
  let { pattern, finish, tile, grout } = options;
  let host = container;
  let interactive = false;

  // ---------- renderer, scene, camera ----------
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  Object.assign(canvas.style, { display: "block", width: "100%", height: "100%" });
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BACKGROUND);
  scene.fog = new THREE.Fog(BACKGROUND, 8, 16);

  // Soft studio reflections give polished stone its sheen.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;

  const sun = new THREE.DirectionalLight("#fff6e8", 1.1);
  sun.position.set(4, 8, 3);
  scene.add(sun);
  scene.add(new THREE.HemisphereLight("#ffffff", "#b9b2a6", 0.35));

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  const cameraRig = { ...VIEW };
  const lookTarget = new THREE.Vector3(0, 0, -1.2);

  // ---------- textures and shared materials ----------
  const groutPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(EXTENT * 2.4, EXTENT * 2.4),
    new THREE.MeshStandardMaterial({ color: grout.color, roughness: 0.95 }),
  );
  groutPlane.rotation.x = -Math.PI / 2;
  scene.add(groutPlane);

  const loader = new THREE.TextureLoader();
  const textureCache = new Map();
  const maxAnisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  function loadTexture(url) {
    if (!textureCache.has(url)) {
      textureCache.set(
        url,
        loader.loadAsync(url).then((texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.anisotropy = maxAnisotropy;
          return texture;
        }),
      );
    }
    return textureCache.get(url);
  }

  // Slab textures: each variant shows a different part of the slab, turned a
  // random quarter, so the floor reads like natural stone. Natural (uploaded)
  // textures show the whole photo on every tile, the way a real tile looks.
  function makeVariants(texture, natural) {
    return Array.from({ length: natural ? 1 : VARIANTS }, () => {
      const map = texture.clone();
      if (natural) {
        map.repeat.set(1, 1);
      } else {
        map.repeat.set(0.45 * tile.w, 0.45 * tile.d);
        map.offset.set(Math.random() * (1 - map.repeat.x), Math.random() * (1 - map.repeat.y));
        map.center.set(0.5, 0.5);
        map.rotation = (Math.floor(Math.random() * 4) * Math.PI) / 2;
      }
      return new THREE.MeshStandardMaterial({ map, roughness: ROUGHNESS[finish], metalness: 0, envMapIntensity: 0.9 });
    });
  }

  let primary = { texture: await loadTexture(options.texture.url), natural: options.texture.natural };
  let contrast = { texture: await loadTexture(options.contrastTexture.url), natural: options.contrastTexture.natural };
  let pools = { primary: [], contrast: [] };

  function disposePools() {
    for (const material of [...pools.primary, ...pools.contrast]) {
      material.map.dispose();
      material.dispose();
    }
  }

  // ---------- floor ----------
  const floor = new THREE.Group();
  scene.add(floor);
  let geometry = null;
  let tiles = [];
  let perSide = { cols: 0, rows: 0 };

  function applyMaterials() {
    disposePools();
    pools = { primary: makeVariants(primary.texture, primary.natural), contrast: makeVariants(contrast.texture, contrast.natural) };
    tiles.forEach((mesh, index) => {
      const pool = pattern === "checker" && mesh.userData.checker ? pools.contrast : pools.primary;
      mesh.material = pool[index % pool.length];
    });
  }

  function buildFloor() {
    floor.clear();
    geometry?.dispose();
    geometry = new THREE.BoxGeometry(tile.w - grout.gap, THICKNESS, tile.d - grout.gap);
    const cols = Math.min(MAX_PER_SIDE, Math.ceil(EXTENT / tile.w));
    const rows = Math.min(MAX_PER_SIDE, Math.ceil(EXTENT / tile.d));
    perSide = { cols, rows };
    tiles = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const mesh = new THREE.Mesh(geometry);
        mesh.position.set((col - (cols - 1) / 2) * tile.w, THICKNESS / 2, (row - (rows - 1) / 2) * tile.d);
        mesh.userData.checker = (row + col) % 2 === 1;
        floor.add(mesh);
        tiles.push(mesh);
      }
    }
    applyMaterials();
  }

  buildFloor();
  floor.rotation.y = pattern === "diagonal" ? Math.PI / 4 : 0;

  // ---------- sizing ----------
  function resize() {
    const { clientWidth, clientHeight } = host;
    if (!clientWidth || !clientHeight) return;
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  // ---------- pointer: drag to look around; in the popup also tilt, wheel and pinch zoom ----------
  let dragYaw = 0;
  let dragTarget = 0;
  const pointers = new Map();
  let drag = null;
  let pinch = null;
  const clamp = THREE.MathUtils.clamp;

  function setTouchAction() {
    canvas.style.touchAction = interactive ? "none" : "pan-y"; // inline, vertical swipes still scroll the page
    canvas.style.cursor = "grab";
  }
  setTouchAction();

  const onPointerDown = (event) => {
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 2 && interactive) {
      const [a, b] = [...pointers.values()];
      pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), radius: cameraRig.radius };
      drag = null;
    } else {
      drag = { x: event.clientX, y: event.clientY, yaw: dragTarget, height: cameraRig.height };
    }
    canvas.style.cursor = "grabbing";
  };
  const onPointerMove = (event) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      cameraRig.radius = clamp((pinch.radius * pinch.distance) / Math.max(distance, 1), ...LIMITS.radius);
      return;
    }
    if (!drag) return;
    const yaw = drag.yaw + (event.clientX - drag.x) * 0.005;
    dragTarget = interactive ? yaw : clamp(yaw, -0.9, 0.9);
    if (interactive) cameraRig.height = clamp(drag.height + (event.clientY - drag.y) * 0.02, ...LIMITS.height);
  };
  const onPointerUp = (event) => {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinch = null;
    if (!pointers.size) {
      drag = null;
      canvas.style.cursor = "grab";
    }
  };
  const onWheel = (event) => {
    if (!interactive) return;
    event.preventDefault();
    zoomBy(event.deltaY > 0 ? 1.1 : 1 / 1.1);
  };
  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });

  const clock = new THREE.Clock();
  function render() {
    const elapsed = clock.getElapsedTime();
    dragYaw += (dragTarget - dragYaw) * 0.08;
    const sway = reducedMotion || interactive ? 0 : Math.sin(elapsed * 0.18) * 0.22;
    const yaw = cameraRig.yaw + sway + dragYaw;
    // Narrow screens see the floor from a little further back.
    const radius = cameraRig.radius * (camera.aspect < 1 ? 1.25 : 1);
    camera.position.set(Math.sin(yaw) * radius, cameraRig.height, Math.cos(yaw) * radius);
    camera.lookAt(lookTarget);
    scene.fog.near = radius * 0.9;
    scene.fog.far = radius + Math.min(perSide.cols * tile.w, perSide.rows * tile.d) * 0.6;
    renderer.render(scene, camera);
  }

  let active = false;
  function setActive(value) {
    if (value === active) return;
    active = value;
    renderer.setAnimationLoop(active ? render : null);
  }

  // ---------- GSAP transitions ----------
  let timeline;
  const staggerFromCenter = (amount) => ({ grid: [perSide.rows, perSide.cols], from: "center", amount });

  function dropTiles() {
    if (reducedMotion) return;
    gsap.from(
      tiles.map((mesh) => mesh.position),
      { y: 2.5, duration: 1.1, ease: "power3.out", stagger: staggerFromCenter(0.9) },
    );
  }

  /** Lift every tile in a wave, run `change` at the top, then set them down. */
  function waveChange(change, { spin = false } = {}) {
    if (reducedMotion) {
      change();
      return;
    }
    timeline?.progress(1);
    const positions = tiles.map((mesh) => mesh.position);
    const rotations = tiles.map((mesh) => mesh.rotation);
    timeline = gsap.timeline();
    timeline.to(positions, { y: 0.9, duration: 0.45, ease: "power2.in", stagger: staggerFromCenter(0.35) });
    if (spin) timeline.to(rotations, { x: `+=${Math.PI}`, duration: 0.6, ease: "power2.inOut", stagger: staggerFromCenter(0.35) }, 0);
    timeline.add(change, ">-0.1");
    timeline.to(positions, { y: THICKNESS / 2, duration: 0.7, ease: "power3.out", stagger: staggerFromCenter(0.35) });
  }

  function killTileTweens() {
    timeline?.kill();
    gsap.killTweensOf([...tiles.map((mesh) => mesh.position), ...tiles.map((mesh) => mesh.rotation)]);
  }

  // ---------- public controls ----------
  async function setMaterial(texture, contrastTexture) {
    const [nextPrimary, nextContrast] = await Promise.all([loadTexture(texture.url), loadTexture(contrastTexture.url)]);
    waveChange(
      () => {
        primary = { texture: nextPrimary, natural: texture.natural };
        contrast = { texture: nextContrast, natural: contrastTexture.natural };
        applyMaterials();
      },
      { spin: true },
    );
  }

  function setPattern(nextPattern) {
    if (nextPattern === pattern) return;
    const targetRotation = nextPattern === "diagonal" ? Math.PI / 4 : 0;
    waveChange(() => {
      pattern = nextPattern;
      applyMaterials();
      if (reducedMotion) floor.rotation.y = targetRotation;
    });
    if (!reducedMotion) gsap.to(floor.rotation, { y: targetRotation, duration: 1.2, ease: "power3.inOut" });
  }

  function setFinish(nextFinish) {
    finish = nextFinish;
    const roughness = ROUGHNESS[finish];
    for (const material of [...pools.primary, ...pools.contrast]) {
      if (reducedMotion) material.roughness = roughness;
      else gsap.to(material, { roughness, duration: 0.9, ease: "power2.out" });
    }
  }

  /** New tile size or grout width: the floor is rebuilt and the tiles drop in. */
  function rebuild() {
    killTileTweens();
    buildFloor();
    dropTiles();
  }
  function setTile(nextTile) {
    tile = nextTile;
    rebuild();
  }
  function setGrout(nextGrout) {
    const gapChanged = nextGrout.gap !== grout.gap;
    grout = nextGrout;
    groutPlane.material.color.set(grout.color);
    if (gapChanged) rebuild();
  }

  /** Moves the canvas into another element (the full-screen popup and back). */
  function mount(element) {
    if (!element || element === host) return;
    resizeObserver.unobserve(host);
    host = element;
    host.appendChild(canvas);
    resizeObserver.observe(host);
    resize();
  }

  function setInteractive(value) {
    interactive = value;
    setTouchAction();
  }

  function zoomBy(factor) {
    const radius = clamp(cameraRig.radius * factor, ...LIMITS.radius);
    if (reducedMotion) cameraRig.radius = radius;
    else gsap.to(cameraRig, { radius, duration: 0.35, ease: "power2.out", overwrite: "auto" });
  }

  function resetView() {
    dragTarget = 0;
    const view = { radius: VIEW.radius, height: VIEW.height };
    if (reducedMotion) Object.assign(cameraRig, view);
    else gsap.to(cameraRig, { ...view, duration: 0.6, ease: "power2.out", overwrite: "auto" });
  }

  /** Frees a texture that will not be used again (a replaced upload). */
  function release(url) {
    textureCache.get(url)?.then((texture) => texture.dispose());
    textureCache.delete(url);
  }

  /** The current view as a JPEG blob (rendered now, so the buffer is still filled). */
  function capture() {
    render();
    return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
  }

  function dispose() {
    renderer.setAnimationLoop(null);
    killTileTweens();
    gsap.killTweensOf([cameraRig, floor.rotation, ...pools.primary, ...pools.contrast]);
    resizeObserver.disconnect();
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("wheel", onWheel);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    disposePools();
    geometry.dispose();
    groutPlane.geometry.dispose();
    groutPlane.material.dispose();
    textureCache.forEach((promise) => promise.then((texture) => texture.dispose()));
    environment.dispose();
    pmrem.dispose();
    renderer.dispose();
    canvas.remove();
  }

  if (!reducedMotion) gsap.from(cameraRig, { radius: cameraRig.radius + 4, height: 9, duration: 2.2, ease: "power3.out" });
  dropTiles();
  return { setMaterial, setPattern, setFinish, setTile, setGrout, setActive, mount, setInteractive, zoomBy, resetView, capture, release, dispose };
}
