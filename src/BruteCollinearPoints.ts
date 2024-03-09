export class BruteCollinearPoints {
	points: Point[];
	lineSegments: LineSegment[] = [];

	constructor(points: Point[]) {
		this.points = points;
		this.findCollinearPoints();
	}

	numberOfSegments(): number {
		return this.lineSegments.length;
	}

	segments(): LineSegment[] {
		return this.lineSegments;
	}

	private findCollinearPoints() {
		const n = this.points.length;
		for (let i = 0; i < n; i++) {
			for (let j = i + 1; j < n; j++) {
				for (let k = j + 1; k < n; k++) {
					for (let l = k + 1; l < n; l++) {
						const p = this.points[i];
						const q = this.points[j];
						const r = this.points[k];
						const s = this.points[l];

						if (
							p.slopeTo(q) === p.slopeTo(r) &&
							p.slopeTo(r) === p.slopeTo(s)
						) {
							this.lineSegments.push(new LineSegment(p, s));
						}
					}
				}
			}
		}
	}
}
