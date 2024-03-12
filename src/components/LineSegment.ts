import * as p5 from "p5";
import Point from "./Point";

class LineSegment {
  p: p5;
  q: p5;

  constructor(p: Point, q: Point) {
    this.p = p;
    this.q = q;
  }

  draw(): void {
    this.p.stroke("black");
    this.p.strokeWeight(2);
    this.p.line(this.p.x, this.p.y, this.q.x, this.q.y);
  }

  toString(): string {
    return `${this.p} -> ${this.q}`;
  }
}

function mergeSort(points: Point[], origin: Point): Point[] {
  if (points.length <= 1) {
    return points;
  }

  const middle = Math.floor(points.length / 2);
  const left = points.slice(0, middle);
  const right = points.slice(middle);

  return merge(mergeSort(left, origin), mergeSort(right, origin), origin);
}

function merge(left: Point[], right: Point[], origin: Point): Point[] {
  let result: Point[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const slopeLeft = origin.slopeTo(left[leftIndex]);
    const slopeRight = origin.slopeTo(right[rightIndex]);

    if (slopeLeft < slopeRight) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else if (slopeLeft > slopeRight) {
      result.push(right[rightIndex]);
      rightIndex++;
    } else {
      const sameSlope = [left[leftIndex], right[rightIndex]];
      while (
        leftIndex < left.length &&
        origin.slopeTo(left[leftIndex]) === slopeLeft
      ) {
        sameSlope.push(left[leftIndex]);
        leftIndex++;
      }
      while (
        rightIndex < right.length &&
        origin.slopeTo(right[rightIndex]) === slopeRight
      ) {
        sameSlope.push(right[rightIndex]);
        rightIndex++;
      }
      result = result.concat(sameSlope.sort((a, b) => a.compareTo(b)));
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
export default LineSegment;
