# Odd SVG Path

JS library to generate the SVG path that will be used as a frame for the site and for various elements (like team pictures).

## Basic usage

Create an array of lines and pass it to the `buildFrame()` function.

```js
var path = [
  ["h", 100],
  ["v", 100],
  ["h", -100],
  ["v", -100],
];

buildFrame("elementId", path);
```

This will create a frame to the maximum available space. Notice that `buildFrame()` accept an `options` object that allows you to customize default values. More info on the path later.

### Syntax

All you need to care about is `buildFrame()`, we already saw that it accepts an ID for the element and an array that defines the path but as anticipated is also able to accept an `options` object:

- `hStart` _(integer)_ default: `10` - defines the horizontal start point to draw the shape, it's value is threated as pixel and will also be used to define the minimum horizontal size of the frame,
- `vStart` _(integer)_ default: `10` - defines the vertical (start point to draw the shape, it's value is threated as pixel and will also be used to define the minimum vertical size of the frame,
- `arcRad` _(integer)_ default: `0` - defines the radius for the arcs that the library will generate as conjunction points

## More on path

A path is always drawn from the top-left corner and each line is drawn clockwise. The array describes the lines that we need to write, the vertical values are considered as relative to the viewport while the horizontal can be relative or absolute.

- `v` - draws a vertical line, positive values go top to bottom while negative ones are bottom to top
- `h` - relative unit to draw an horizontal line, positive values go left to right while negative ones are right to left
- `H` - absolute unit to draw an horizontal line, positive values define an absolute point **from the right margin** while negative ones define an absolute point **from the left margin**.

When you use an absolute unit you have two magic values, _close_ and _start_. Using those strings with `H` will allows you to draw the horizontal line to reach the margins defined by the frame, with _close_ you reach the right margin while with _start_ you reach the left one.

An example can be seen as our base shape:

```js
const oddFrame = [
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
];
```
