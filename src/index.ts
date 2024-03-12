import p5 from "p5";

import Point from "./components/Point";
import LineSegment from "./components/LineSegment";
import BruteCollinearPoints from "./components/BruteCollinearPoints";
import FastCollinearPoints from "./components/FastCollinearPoints";

const width: number = 800;
const height: number = 500;
const padding: number = 50;

const sketch = function (p: p5) {
  p.setup = function () {
    p.createCanvas(width, height);

    p.strokeWeight(3);
    p.stroke("blue");

    // x and y axes
    p.line(padding, padding, padding, height - padding);
    p.line(padding, height - padding, width - padding, height - padding);

    // y-axis arrow head
    p.line(padding, padding, padding - 5, padding + 5);
    p.line(padding, padding, padding + 5, padding + 5);

    // x-axis arrow head
    p.line(
      width - padding,
      height - padding,
      width - padding - 5,
      height - padding + 5
    );
    p.line(
      width - padding,
      height - padding,
      width - padding - 5,
      height - padding - 5
    );

    p.strokeWeight(0);
    p.text("(0, 0)", padding + 10, height - 30);
  };

  // from input40.txt
  const points: Point[] = [
    new Point(1000, 17000),
    new Point(14000, 24000),
    new Point(26000, 8000),
    new Point(10000, 28000),
    new Point(18000, 5000),
    new Point(1000, 27000),
    new Point(14000, 14000),
    new Point(11000, 16000),
    new Point(29000, 17000),
    new Point(5000, 21000),
    new Point(19000, 26000),
    new Point(28000, 21000),
    new Point(25000, 24000),
    new Point(30000, 10000),
    new Point(25000, 14000),
    new Point(31000, 16000),
    new Point(5000, 12000),
    new Point(1000, 31000),
    new Point(2000, 24000),
    new Point(13000, 17000),
    new Point(1000, 28000),
    new Point(14000, 16000),
    new Point(26000, 26000),
    new Point(10000, 31000),
    new Point(12000, 4000),
    new Point(9000, 24000),
    new Point(28000, 29000),
    new Point(12000, 20000),
    new Point(13000, 11000),
    new Point(4000, 26000),
    new Point(8000, 10000),
    new Point(15000, 12000),
    new Point(22000, 29000),
    new Point(7000, 15000),
    new Point(10000, 4000),
    new Point(2000, 29000),
    new Point(17000, 17000),
    new Point(3000, 15000),
    new Point(4000, 29000),
    new Point(19000, 2000),
  ];

  // biome-ignore lint/complexity/useArrowFunction: <explanation>
  p.draw = function () {
    p.translate(padding, height - padding);
    p.scale(1 / 100, -1 / 100);

    for (const point of points) {
      point.draw();
    }
    //fast collinear
    const collinear = new FastCollinearPoints(points);
    for (const segment of collinear.segments()) {
      console.log(segment.toString());
      segment.draw();
    }
    //brute collinear
    const collinear2 = new BruteCollinearPoints(points);
    for (const segment of collinear2.segments()) {
      console.log(segment.toString());
      segment.draw();
    }
  };
};

new p5(sketch);
