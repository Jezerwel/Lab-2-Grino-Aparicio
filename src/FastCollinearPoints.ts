export class FastCollinearPoints {
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
		for (const p of this.points) {
			const sortedPoints = this.mergeSort(
				[...this.points],
				(q, r) => p.slopeTo(q) - p.slopeTo(r),
			);

			let start = 0;
			let count = 1;
			let maxCount = 1;
			let startPoint: Point | null = null;
			let endPoint: Point | null = null;

			for (let i = 1; i < sortedPoints.length; i++) {
				if (p.slopeTo(sortedPoints[i]) === p.slopeTo(sortedPoints[i - 1])) {
					count++;
				} else {
					if (count >= 4) {
						if (count > maxCount) {
							maxCount = count;
							startPoint = sortedPoints[start];
							endPoint = sortedPoints[i - 1];
						}
					}
					start = i;
					count = 1;
				}
			}

			if (count >= 4) {
				if (count > maxCount) {
					maxCount = count;
					startPoint = sortedPoints[start];
					endPoint = sortedPoints[sortedPoints.length - 1];
				}
			}

			if (maxCount >= 4 && startPoint !== null && endPoint !== null) {
				this.lineSegments.push(new LineSegment(startPoint, endPoint));
			}
		}
	}

	private mergeSort<T>(array: T[], compareFn: (a: T, b: T) => number): T[] {
		if (array.length <= 1) {
			return array;
		}

		const mid = Math.floor(array.length / 2);
		const left = array.slice(0, mid);
		const right = array.slice(mid);

		return this.merge(
			this.mergeSort(left, compareFn),
			this.mergeSort(right, compareFn),
			compareFn,
		);
	}

	private merge<T>(
		left: T[],
		right: T[],
		compareFn: (a: T, b: T) => number,
	): T[] {
		let leftIndex = 0;
		let rightIndex = 0;
		const result: T[] = [];

		while (leftIndex < left.length && rightIndex < right.length) {
			if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
				result.push(left[leftIndex]);
				leftIndex++;
			} else {
				result.push(right[rightIndex]);
				rightIndex++;
			}
		}

		return result.concat(left.slice(leftIndex), right.slice(rightIndex));
	}
}
