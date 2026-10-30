// Ready-made rooms for the room visualiser. Coordinates are in pixels of the
// photo (see images.js for its size). The room is a box: `inner` is the far
// wall (TL, TR, BR, BL) and `outer` the near frame, which may lie outside the
// photo. `keep` outlines fixtures (mirror, windows, tub, WC, vanity) that tiles
// must not cover. `room` is the approximate real size in feet, for tile scale.

export const roomSamples = [
  {
    id: "bathroom",
    image: "roomSampleBath",
    name: { en: "Master washroom", ur: "ماسٹر واش روم" },
    room: { width: 5, height: 9, depth: 10.5 },
    inner: [
      [600, 150],
      [1005, 150],
      [1005, 905],
      [600, 905],
    ],
    outer: [
      [0, -1061],
      [1794, -1061],
      [1794, 2284],
      [0, 2284],
    ],
    keep: [
      [[0, 0], [505, 0], [505, 545], [0, 600]],
      [[595, 232], [872, 232], [872, 368], [595, 368]],
      [[640, 678], [1010, 678], [1098, 742], [1098, 910], [640, 910]],
      [[860, 630], [960, 630], [960, 690], [860, 690]],
      [[945, 828], [1100, 800], [1160, 830], [1200, 885], [1200, 955], [975, 960]],
      [[1010, 955], [1240, 940], [1300, 965], [1400, 1068], [1040, 1068], [1010, 990]],
      [[1300, 635], [1405, 660], [1405, 765], [1300, 750]],
      [[1470, 780], [1565, 800], [1565, 875], [1470, 860]],
      [[1012, 540], [1495, 585], [1495, 600], [1012, 555]],
      [[420, 680], [668, 678], [668, 880], [560, 1068], [0, 1068], [0, 1000]],
    ],
    surfaces: {
      floor: { on: true, material: "marbleGrey", size: "24x24" },
      back: { on: true, material: "marbleGold", size: "12x24" },
      left: { on: true, material: "marbleGold", size: "12x24" },
      right: { on: true, material: "marbleGold", size: "12x24" },
      ceiling: { on: false, material: "marbleGrey", size: "24x24" },
    },
  },
];
