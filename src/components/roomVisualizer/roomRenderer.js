// WebGL2 renderer for the room visualiser. It draws the room photo, then lays
// tiles on each chosen surface with a perspective (homography) mapping, keeps
// the photo's own light and shadow, and redraws "keep" areas (fixtures) on top.
// Loaded with a dynamic import() so it stays out of the main bundle.

const VERTEX = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const PHOTO_FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D uPhoto;
uniform vec2 uRes;
out vec4 color;
void main() {
  color = vec4(texture(uPhoto, vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uRes).rgb, 1.0);
}`;

const TILE_FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D uPhoto;
uniform sampler2D uTile;
uniform sampler2D uKeep;
uniform mat3 uInverse;
uniform vec2 uRes;
uniform vec2 uCount;
uniform vec2 uGap;
uniform vec3 uGrout;
uniform float uReference;
uniform bool uNatural;
out vec4 color;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 st = px / uRes;
  if (texture(uKeep, st).r > 0.5) discard;
  vec3 q = uInverse * vec3(px, 1.0);
  if (q.z <= 0.0) discard;
  vec2 uv = q.xy / q.z;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) discard;

  vec2 t = uv * uCount;
  vec2 cell = floor(t);
  vec2 f = fract(t);
  vec3 c;
  if (any(lessThan(f, uGap * 0.5)) || any(greaterThan(f, 1.0 - uGap * 0.5))) {
    c = uGrout;
  } else {
    // Stone textures: each tile shows a different part of the slab.
    vec2 tuv = uNatural ? f : f * 0.45 + vec2(hash(cell), hash(cell + 7.31)) * 0.55;
    c = textureGrad(uTile, tuv, dFdx(t) * (uNatural ? 1.0 : 0.45), dFdy(t) * (uNatural ? 1.0 : 0.45)).rgb;
  }
  // Keep the photo's lighting: a blurred copy of the room scales the tile colour.
  float light = dot(textureLod(uPhoto, st, 4.0).rgb, vec3(0.299, 0.587, 0.114));
  c *= clamp(light / uReference, 0.45, 1.2);
  color = vec4(c, 1.0);
}`;

/** Matrix mapping the unit square (0,0)(1,0)(1,1)(0,1) to quad p0..p3. */
function squareToQuad([[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
  const sx = x0 - x1 + x2 - x3;
  const sy = y0 - y1 + y2 - y3;
  let g = 0;
  let h = 0;
  if (Math.abs(sx) > 1e-9 || Math.abs(sy) > 1e-9) {
    const dx1 = x1 - x2;
    const dx2 = x3 - x2;
    const dy1 = y1 - y2;
    const dy2 = y3 - y2;
    const den = dx1 * dy2 - dx2 * dy1;
    g = (sx * dy2 - dx2 * sy) / den;
    h = (dx1 * sy - sx * dy1) / den;
  }
  return [x1 - x0 + g * x1, x3 - x0 + h * x3, x0, y1 - y0 + g * y1, y3 - y0 + h * y3, y0, g, h, 1];
}

function invert3([a, b, c, d, e, f, g, h, i]) {
  const A = e * i - f * h;
  const B = -(d * i - f * g);
  const C = d * h - e * g;
  const det = a * A + b * B + c * C;
  if (!det) return null;
  const k = 1 / det;
  return [A * k, -(b * i - c * h) * k, (b * f - c * e) * k, B * k, (a * i - c * g) * k, -(a * f - c * d) * k, C * k, -(a * h - b * g) * k, (a * e - b * d) * k];
}

/** Inverse homography (image px -> unit square) for a quad, or null if degenerate. */
export function quadInverse(quad) {
  return invert3(squareToQuad(quad));
}

export function isWebGL2Available() {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
}

function compile(gl, vertex, fragment) {
  const program = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vertex],
    [gl.FRAGMENT_SHADER, fragment],
  ]) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    gl.attachShader(program, shader);
  }
  gl.bindAttribLocation(program, 0, "aPos");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  const uniforms = {};
  for (let index = 0; index < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); index += 1) {
    const { name } = gl.getActiveUniform(program, index);
    uniforms[name] = gl.getUniformLocation(program, name);
  }
  return { program, uniforms };
}

/**
 * createRoomRenderer(canvas) -> { setPhoto, setKeep, setTileTexture, render, dispose }
 * setPhoto(source): HTMLImageElement/ImageBitmap/canvas; sets the canvas size.
 * setKeep(polygons): areas (image px) that tiles never cover.
 * render(surfaces): [{ quad, count:[u,v], gap:[u,v], grout:[r,g,b], textureUrl, natural, reference }]
 */
export function createRoomRenderer(canvas) {
  const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true, antialias: true });
  if (!gl) throw new Error("WebGL2 unavailable");
  const photoProgram = compile(gl, VERTEX, PHOTO_FRAGMENT);
  const tileProgram = compile(gl, VERTEX, TILE_FRAGMENT);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  function makeTexture(source, mipmaps) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipmaps ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    if (mipmaps) gl.generateMipmap(gl.TEXTURE_2D);
    return texture;
  }

  let photo = null;
  let keep = null;
  const tileTextures = new Map(); // url -> Promise<WebGLTexture>

  function setPhoto(source) {
    canvas.width = source.width;
    canvas.height = source.height;
    if (photo) gl.deleteTexture(photo);
    photo = makeTexture(source, true);
    setKeep([]);
  }

  function setKeep(polygons) {
    const mask = document.createElement("canvas");
    mask.width = canvas.width;
    mask.height = canvas.height;
    const context = mask.getContext("2d");
    context.fillStyle = "#fff";
    for (const polygon of polygons) {
      context.beginPath();
      polygon.forEach(([x, y], index) => (index ? context.lineTo(x, y) : context.moveTo(x, y)));
      context.closePath();
      context.fill();
    }
    if (keep) gl.deleteTexture(keep);
    keep = makeTexture(mask, false);
  }

  function tileTexture(url) {
    if (!tileTextures.has(url)) {
      tileTextures.set(
        url,
        new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(makeTexture(image, true));
          image.onerror = reject;
          image.src = url;
        }),
      );
    }
    return tileTextures.get(url);
  }

  function release(url) {
    tileTextures.get(url)?.then((texture) => gl.deleteTexture(texture));
    tileTextures.delete(url);
  }

  let renderId = 0;
  async function render(surfaces) {
    if (!photo) return;
    const id = (renderId += 1);
    const textures = await Promise.all(surfaces.map((surface) => tileTexture(surface.textureUrl)));
    if (id !== renderId) return; // a newer render started while textures loaded

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(photoProgram.program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, photo);
    gl.uniform1i(photoProgram.uniforms.uPhoto, 0);
    gl.uniform2f(photoProgram.uniforms.uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    const u = tileProgram.uniforms;
    gl.useProgram(tileProgram.program);
    gl.uniform1i(u.uPhoto, 0);
    gl.uniform1i(u.uTile, 1);
    gl.uniform1i(u.uKeep, 2);
    gl.uniform2f(u.uRes, canvas.width, canvas.height);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, keep);
    surfaces.forEach((surface, index) => {
      const inverse = quadInverse(surface.quad);
      if (!inverse) return;
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[index]);
      gl.uniformMatrix3fv(u.uInverse, true, inverse);
      gl.uniform2f(u.uCount, ...surface.count);
      gl.uniform2f(u.uGap, ...surface.gap);
      gl.uniform3f(u.uGrout, ...surface.grout);
      gl.uniform1f(u.uReference, surface.reference);
      gl.uniform1i(u.uNatural, surface.natural ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
  }

  function dispose() {
    renderId += 1;
    tileTextures.forEach((promise) => promise.then((texture) => gl.deleteTexture(texture)).catch(() => {}));
    if (photo) gl.deleteTexture(photo);
    if (keep) gl.deleteTexture(keep);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(photoProgram.program);
    gl.deleteProgram(tileProgram.program);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  }

  return { setPhoto, setKeep, render, release, dispose };
}
