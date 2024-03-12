import Point from "./Point";
import LineSegment from "./LineSegment";

class BruteCollinearPoints {
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
    for (let i = 0; i < this.points.length - 3; i++) {
      for (let j = i + 1; j < this.points.length - 2; j++) {
        for (let k = j + 1; k < this.points.length - 1; k++) {
          for (let l = k + 1; l < this.points.length; l++) {
            const p = this.points[i];
            const q = this.points[j];
            const r = this.points[k];
            const s = this.points[l];

            if (
              p.slopeTo(q) === p.slopeTo(r) &&
              p.slopeTo(r) === p.slopeTo(s)
            ) {
              const minX = Math.min(p.x, q.x, r.x, s.x);
              const maxX = Math.max(p.x, q.x, r.x, s.x);
              const minY = Math.min(p.y, q.y, r.y, s.y);
              const maxY = Math.max(p.y, q.y, r.y, s.y);

              const start = new Point(minX, minY);
              const end = new Point(maxX, maxY);

              this.lineSegments.add(new LineSegment(start, end));
            }
          }
        }
      }
    }
  }
}

export default BruteCollinearPoints;
