import Point from "./Point";
import LineSegment from "./LineSegment";
import { mergeSort } from "./sorting";

class FastCollinearPoints {
  points: Point[];
  lineSegments: Set<LineSegment>;

  constructor(points: Point[]) {
    if (!points || points.length < 4) {
      throw new Error("At least 4 points are required");
    }

    this.points = points.slice();
    this.lineSegments = new Set();

    this.findCollinearPoints();
  }

  numberOfSegments(): number {
    return this.lineSegments.size;
  }

  segments(): LineSegment[] {
    return Array.from(this.lineSegments);
  }

  findCollinearPoints(): void {
    for (const p of this.points) {
      const otherPoints = this.points.filter((q) => q !== p);
      const sortedPoints = mergeSort(otherPoints, p);

      let start = 0;
      while (start < sortedPoints.length) {
        let end = start + 1;
        while (
          end < sortedPoints.length &&
          p.slopeTo(sortedPoints[start]) === p.slopeTo(sortedPoints[end])
        ) {
          end++;
        }

        if (
          end - start >= 3 &&
          p.slopeTo(sortedPoints[start]) !== Number.NEGATIVE_INFINITY
        ) {
          this.lineSegments.add(new LineSegment(p, sortedPoints[end - 1]));
        }

        start = end;
      }
    }
  }
}

export default FastCollinearPoints;
