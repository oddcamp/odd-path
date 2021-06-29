import anime from "animejs/lib/anime.es.js";
import * as paths from "./paths";
import { svgFrame } from "./svgFrame";
import "./styles.css";

const p = paths.absOne;
const containerClass = ".svg-container";
const container = document.querySelector(containerClass);

document.addEventListener("DOMContentLoaded", () => {
  new ResizeObserver(perfResize).observe(document.body);
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

  const paths = svgFrame(container, p[acceptedBp], { animate: true });

  // Once resized it's time to animate it (if you have points)
  if (p[acceptedBp].start) {
    animate(paths);
  }
}

function animate(paths) {
  anime({
    targets: `${containerClass} path`,
    d: [{ value: paths.to }],
    easing: "easeInOutBack",
    duration: 700,
    loop: false,
  });
}
