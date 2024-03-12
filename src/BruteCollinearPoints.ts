import Point from "./point";
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
							this.lineSegments.add(new LineSegment(p, s));
						}
					}
				}
			}
		}
	}
}

export default BruteCollinearPoints;
