import Point from "./point";
import LineSegment from "./LineSegment";
import { mergeSort } from "./sorting";

class FastCollinearPoints {
	points: Point[];
	lineSegments: LineSegment[];

	constructor(points: Point[]) {
		if (!points || points.length < 4) {
			throw new Error("At least 4 points are required");
		}

		this.points = points.slice();
		this.lineSegments = [];

		this.findCollinearPoints();
	}

	numberOfSegments(): number {
		return this.lineSegments.length;
	}

	segments(): LineSegment[] {
		return this.lineSegments;
	}

	private findCollinearPoints(): void {
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
					this.lineSegments.push(new LineSegment(p, sortedPoints[end - 1]));
				}

				start = end;
			}
		}
	}
}

export default FastCollinearPoints;
