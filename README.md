# Odd SVG Path

JS library to generate the SVG path that will be used as a frame for the site and for various elements (like team pictures).

## Basic usage

Create an array of lines and pass it to the `svgFrame()` function.

```js
var path = {
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

svgFrame("elementId", path);
```

This will create a frame to the maximum available space. Notice that `svgFrame()` accept an `options` object that allows you to customize default values. More info on the path later.

### Syntax

All you need to care about is `svgFrame()`, we already saw that it accepts an ID for the element and an array that defines the path but as anticipated is also able to accept an `options` object:

- `hStart` _(integer)_ default: `10` - defines the horizontal start point to draw the shape, it's value is threated as pixel and will also be used to define the minimum horizontal size of the frame,
- `vStart` _(integer)_ default: `10` - defines the vertical (start point to draw the shape, it's value is threated as pixel and will also be used to define the minimum vertical size of the frame,

## More on path, points and configuration

A path is always drawn from the top-left corner and each line is drawn clockwise. The array of points describes the lines that we need to draw on the screen. Vertical values are considered as relative to the viewport while the horizontal can be relative or absolute.

- `v` - draws a vertical line, positive values go top to bottom while negative ones are bottom to top
- `h` - relative unit to draw an horizontal line, positive values go left to right while negative ones are right to left
- `H` - absolute unit to draw an horizontal line, positive values define an absolute point **from the right margin** while negative ones define an absolute point **from the left margin**.

When you use an absolute unit (`H`) you have two magic values, _close_ and _start_. Using those strings will allow you to draw the horizontal line to reach the margins defined by the frame, with _close_ you reach the right margin while with _start_ you reach the left one.

The `points` array lives inside a configuration object that let you define the window size, this lets you define more `points` and `arcRad` to accomodate the shape on different screen sizes.

An example can be seen as our base shape:

```js
const oddFrame = {
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
```

## Animating

We can animate a path, all you need to do is pass a `start` property to the defining object in order to give the system the first points in order to start the animation from.

So we can animate the paths above like so:

```js
const absOne = {
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
```

As you can see we added the starting point for the `0` and the `640` breakpoint this makes the path at `1024` static.
