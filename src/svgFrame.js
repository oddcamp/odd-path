// TODO: create helper fn to calc if values are over viewBox size
// TODO: simplify arc conditionals
// TODO: animate path

function percToPixel(val, base) {
  if (typeof val === "string") {
    // String values are always treated as px except for closing
    const values = val.split(/(?=-)/).map((num) => parseInt(num, 10));
    return (values[0] * base) / 100 + values[1];
  }
  return (val / 100) * base;
}

const svgFrame = (element, config, options = {}) => {
  let prevHValue;
  function createPath(point) {
    let [command, val] = point;
    let calculated;
    const operation = val > 0 ? -1 : 1;
    let considerArc = arcRad * 2 * operation;

    if (command === "H") {
      prevHValue ??= val;
      considerArc = considerArc / 2;
      if (val === "close") {
        calculated = vw - hStart - considerArc;
      } else if (val === "start") {
        calculated = hStart + considerArc;
      } else if (val <= Math.abs(prevHValue)) {
        calculated =
          val < 0 ? Math.abs(val) + considerArc : vw - val + considerArc;
      } else if (prevHValue === "close") {
        calculated =
          val < 0 ? Math.abs(val) + considerArc : vw - val - considerArc;
      } else {
        calculated = val < 0 ? Math.abs(val) : vw - val;
      }
    } else {
      let axis = command === "h" ? vw - hStart * 2 : vh - vStart * 2;
      if (command === "h" && typeof prevHValue === "number") {
        axis -= prevHValue;
        considerArc *= -1;
      }
      calculated = percToPixel(val, axis) + considerArc;
    }
    return command + calculated;
  }

  /**
   * This functions is in charge of creating the arc for the angles of the path
   *
   * @param {Object[]} p - Pair of command - value needed to decide the type of arc
   * @param {number} i - The index of the array we are currently looping
   * @param {number} r - The radius we want to use to create the arc
   * @returns
   */
  function createArc(p, i, r = arcRad) {
    const [command, val] = p;
    // Arc definitions
    let sweep = 0;
    let x = "";
    let y = "";

    // Logic booleans
    // Current
    const isPositive = val > 0;
    const isClose = val === "close";
    const isStart = val === "start";
    const isLast = i === points.length - 1;

    // Next
    const nextPoint =
      points[i + 1] &&
      (points[i + 1][1] > 0 ||
        points[i + 1][1] === "close" ||
        points[i + 1][1] === "start");

    if (command === "h" || command === "H") {
      // console.log({ prevHValue, val });
      if (nextPoint) {
        if (isPositive || isClose || isStart) {
          sweep = 1;
        } else {
          x = "-";
        }

        if (prevHValue === "close" && i !== 0) {
          sweep = 0;
          x = "-";
        }
      } else {
        if (isPositive || prevHValue === "start") {
          y = "-";
        } else {
          sweep = 1;
          x = y = "-";
        }
      }
      prevHValue = command === "H" ? val : prevHValue;
    } else {
      if (nextPoint) {
        if (!isPositive) {
          sweep = 1;
          y = "-";
          if (prevHValue < 0) {
            sweep = 0;
            x = "-";
          }
        } else if (prevHValue === "close" || points[i + 1][1] === "start") {
          sweep = 1;
          x = "-";
        } else {
          sweep = 0;
        }
      } else {
        if (isPositive) {
          sweep = 1;
          x = "-";
        } else {
          if (isLast) {
            sweep = 1;
            y = "-";
          } else if (prevHValue === "start") {
            sweep = 1;
            y = "-";
          } else {
            x = y = "-";
          }
        }
      }
    }

    return `a ${r} ${r} 0 0 ${sweep} ${x}${r} ${y}${r}`;
  }

  // Remove direct SVG child
  if (element.querySelector(`svg`)) {
    element.querySelector(`svg`).remove();
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const svgNS = svg.namespaceURI;
  const path = document.createElementNS(svgNS, "path");

  // Customize path
  path.setAttribute("fill", "#87BF86");
  path.setAttribute("stroke-width", 0);

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  // Simple testing
  // const vw = 1000;
  // const vh = 600;

  let { hStart = 20, vStart = 20, svgClass, animate = true } = options;
  const { arcRad = 0, start = [], points } = config;

  // Setting up the SVG
  if (svgClass) {
    svg.classList.add(svgClass);
  }
  svg.setAttribute("width", `${vw}px`);
  svg.setAttribute("height", `${vh}px`);
  svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);

  // Wrapper path
  let d = `M${vw} 0 L 0 0 L 0 ${vh} L ${vw} ${vh} L ${vw} 0 Z`;
  let zeroD = d;
  // Drawing shape
  d += `M${hStart + arcRad} ${vStart}`;
  zeroD += `M${hStart + arcRad} ${vStart}`;

  // Creating path
  points.forEach((p, index) => {
    // Add line
    d += createPath(p);
    // Add arc
    d += createArc(p, index);
  });

  // Calculate start shape to animate from
  if (animate && start.length > 0) {
    start.forEach((p, index) => {
      zeroD += createPath(p);
      zeroD += createArc(p, index);
    });
  }

  // PREVIOUS APPROACH
  // Math calculating start shape to animate from
  // if (animating) {
  //   let newValue = 0;
  //   if (p[0] === "h" && Math.abs(p[1]) > 50) {
  //     // Calculate max size for relative horizontal
  //     newValue = vw;
  //   }
  //   if (p[0] === "H" && (p[1] === "close" || p[1] > 0)) {
  //     console.log(`Am I reading close? ${p[1]}`);
  //     // Set the max horizontal value
  //     newValue = vw;
  //   }
  //   zeroD += p[0] === "v" ? createPath(p) : `${p[0]}${newValue}`;
  //   zeroD += createArc(p, index, 0);
  // }

  const setPath = animate && start.length > 0 ? zeroD : d;

  path.setAttribute("d", setPath);
  svg.appendChild(path);
  svg.appendChild(path);
  element.appendChild(svg);

  return { from: zeroD, to: d };
};

export { svgFrame };
