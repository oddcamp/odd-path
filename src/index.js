import { svgFrame } from "./svgFrame";
import "./styles.css";

// REMEMBER:
// Each path is affected from the starting point
// and by the arc radius

const relPathOne = [
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

const relPathTwo = [
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

const relPathThree = [
  ["h", 80],
  ["v", 80],
  ["h", -80],
  ["v", -80],
];

const relPathFour = [
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

const relPathFive = [
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

const relPathSix = [
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

const relPathSquare = [
  ["h", 100],
  ["v", 100],
  ["h", -100],
  ["v", -100],
];

const absPathOne = {
  0: {
    arcRad: 5,
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
    points: [
      ["H", 100],
      ["v", 5],
      ["H", 50],
      ["v", 5],
      ["H", "close"],
      ["v", 80],
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

const absPathTwo = {
  0: {
    arcRad: 10,
    points: [
      ["H", 50],
      ["v", 20],
      ["H", "close"],
      ["v", 70],
      ["H", 50],
      ["v", 10],
      ["H", -80],
      ["v", -10],
      ["H", -50],
      ["v", -60],
      ["H", "start"],
      ["v", -30],
    ],
  },
};

const absPathThree = [
  ["h", 100],
  ["v", 100],
  ["H", -300],
  ["v", -10],
  ["H", "start"],
  ["v", -90],
];

// The following are edge cases that shown that the arc calculation needs improvements
const notPlayWellMiddleVertical = [
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

const notPlayWellMiddleHorizontal = [
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

const paths = [
  relPathOne,
  relPathTwo,
  relPathThree,
  relPathFour,
  relPathFive,
  relPathSix,
  relPathSquare,
  absPathOne,
  absPathTwo,
  absPathThree,
];

// const path = Math.floor(Math.random() * paths.length);
const p = absPathOne;
const container = document.querySelector(".svg-container");

document.addEventListener("DOMContentLoaded", () => {
  // Not working on resize
  // if (Object.entries(p).length > 1) {
  //   return new ResizeObserver(perfResize).observe(document.body);
  // }

  // const container = document.querySelector(".svg-container");
  // svgFrame(container, p[0]);

  return new ResizeObserver(perfResize).observe(document.body);
});

function debounce(fn, delay = 300) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const perfResize = debounce(handleResize);

function handleResize(entries) {
  const acceptedBp = Object.entries(p).reduce((acc, p) => {
    const [bp] = p;
    return window.matchMedia(`(min-width: ${bp}px`).matches ? bp : acc;
  }, 0);
  console.log(entries[0].target);

  svgFrame(container, p[acceptedBp]);
}
