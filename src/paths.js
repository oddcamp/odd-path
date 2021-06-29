// REMEMBER:
// Each path is affected from the starting point
// and by the arc radius

export const relOne = [
  ["h", 100],
  ["v", 20],
  ["h", -5],
  ["v", 20],
  ["h", 5],
  ["v", 60],
  ["h", -50],
  ["v", -2],
  ["h", -10],
  ["v", 2],
  ["h", -40],
  ["v", -30],
  ["h", 4],
  ["v", -40],
  ["h", -4],
  ["v", -30],
];

export const relTwo = [
  ["h", 25],
  ["v", 3],
  ["h", 50],
  ["v", 80],
  ["h", 25],
  ["v", 17],
  ["h", -10],
  ["v", -2],
  ["h", -15],
  ["v", -2],
  ["h", -12],
  ["v", -4],
  ["h", -63],
  ["v", -92],
];

export const relThree = [
  ["h", 80],
  ["v", 80],
  ["h", -80],
  ["v", -80],
];

export const relFour = [
  ["h", 90],
  ["v", 20],
  ["h", 10],
  ["v", 20],
  ["h", -10],
  ["v", 40],
  ["h", 10],
  ["v", 20],
  ["h", -100],
  ["v", -100],
];

export const relFive = [
  ["h", 100],
  ["v", 60],
  ["h", -10],
  ["v", 40],
  ["h", -90],
  ["v", -10],
  ["h", 10],
  ["v", -60],
  ["h", -10],
  ["v", -30],
];

export const relSix = [
  ["h", 100],
  ["v", 20],
  ["h", -10],
  ["v", 20],
  ["h", 10],
  ["v", 60],
  ["h", -60],
  ["v", -15],
  ["h", -30],
  ["v", 15],
  ["h", -10],
  ["v", -40],
  ["h", 15],
  ["v", -35],
  ["h", -15],
  ["v", -25],
];

export const relSquare = {
  0: {
    arcRad: 5,
    points: [
      ["h", 100],
      ["v", 100],
      ["h", -100],
      ["v", -100],
    ],
  },
};

export const absOne = {
  0: {
    arcRad: 5,
    start: [
      ["H", 10],
      ["v", 5],
      ["H", 10],
      ["v", 5],
      ["H", "close"],
      ["v", 80],
      ["H", 30],
      ["v", 10],
      ["H", "start"],
      ["v", -100],
    ],
    points: [
      ["H", 60],
      ["v", 5],
      ["H", 30],
      ["v", 5],
      ["H", "close"],
      ["v", 80],
      ["H", 40],
      ["v", 10],
      ["H", "start"],
      ["v", -100],
    ],
  },
  640: {
    arcRad: 10,
    start: [
      ["H", 60],
      ["v", 5],
      ["H", 35],
      ["v", 5],
      ["H", "close"],
      ["v", 80],
      ["H", 40],
      ["v", 10],
      ["H", "start"],
      ["v", -100],
    ],
    points: [
      ["H", 100],
      ["v", 10],
      ["H", 50],
      ["v", 10],
      ["H", "close"],
      ["v", 70],
      ["H", 100],
      ["v", 10],
      ["H", "start"],
      ["v", -100],
    ],
  },

  1024: {
    arcRad: 15,
    points: [
      ["H", 150],
      ["v", 5],
      ["H", 75],
      ["v", 5],
      ["H", "close"],
      ["v", 80],
      ["H", 150],
      ["v", 10],
      ["H", "start"],
      ["v", -100],
    ],
  },
};

export const absTwo = {
  0: {
    arcRad: 10,
    start: [
      ["H", "close"],
      ["v", 100],
      ["H", -40],
      ["v", -50],
      ["H", "start"],
      ["v", -50],
    ],
    points: [
      ["H", "close"],
      ["v", 100],
      ["H", -80],
      ["v", -70],
      ["H", "start"],
      ["v", -30],
    ],
  },
};

export const absSquare = {
  0: {
    arcRad: 10,
    points: [
      ["H", "close"],
      ["v", 100],
      ["H", "start"],
      ["v", -100],
    ],
  },
};

export const absThree = [
  ["h", 100],
  ["v", 100],
  ["H", -300],
  ["v", -10],
  ["H", "start"],
  ["v", -90],
];

// The following are edge cases that shown that the arc calculation needs improvements
export const notPlayWellMiddleVertical = [
  ["h", 100],
  ["v", 100],
  ["H", -60],
  ["v", -10],
  ["H", "start"],
  ["v", -30],
  ["H", -80],
  ["v", -25],
  ["H", -40],
  ["v", -10],
  ["H", "start"],
  ["v", -25],
];

export const notPlayWellMiddleHorizontal = [
  ["h", 30],
  ["v", 10],
  ["H", 150],
  ["v", 5],
  ["H", 75],
  ["v", 15],
  ["H", "close"],
  ["v", 70],
  ["H", 250],
  ["v", -5],
  ["H", 375],
  ["v", 5],
  ["H", "start"],
  ["v", -30],
  ["H", -60],
  ["v", -35],
  ["H", "start"],
  ["v", -35],
];
