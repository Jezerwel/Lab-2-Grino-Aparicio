import p5 from "p5";

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
			height - padding + 5,
		);
		p.line(
			width - padding,
			height - padding,
			width - padding - 5,
			height - padding - 5,
		);

		p.strokeWeight(0);
		p.text("(0, 0)", padding + 10, height - 30);
	};

	class Point {
		x: number;
		y: number;
		p;

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
		}

		draw(): void {
			p.stroke("black");
			p.strokeWeight(800);
			p.point(this.x, this.y);
		}

		drawTo(that: Point) {
			p.stroke("black");
			p.strokeWeight(200);
			p.line(this.x, this.y, that.x, that.y);
		}

		slopeTo(that: Point): number {
			if (this.x === that.x && this.y === that.y) {
				return Number.NEGATIVE_INFINITY;
			}
			if (this.y === that.y) {
				return 0;
			}
			if (this.x === that.x) {
				return Number.POSITIVE_INFINITY;
			}
			return (that.y - this.y) / (that.x - this.x);
		}

		compareTo(that: Point): number {
			if (this.y < that.y) {
				return -1;
			}
			if (this.y > that.y) {
				return 1;
			}
			if (this.x < that.x) {
				return -1;
			}
			if (this.x > that.x) {
				return 1;
			}
			return 0;
		}
	}

	class LineSegment {
		p: Point;
		q: Point;

		constructor(p: Point, q: Point) {
			this.p = p;
			this.q = q;
		}

		draw(): void {
			p.stroke("black");
			p.strokeWeight(2);
			p.line(this.p.x, this.p.y, this.q.x, this.q.y);
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

					if (end - start >= 3) {
						this.lineSegments.add(
							new LineSegment(sortedPoints[start], sortedPoints[end - 1]),
						);
					}

					start = end;
				}
			}
		}
	}

	// from input40.txt
	const points: Point[] = [
		new Point(26000, 27000),
		new Point(24000, 23000),
		new Point(18000, 23000),
		new Point(22000, 9000),
		new Point(25000, 25000),
		new Point(1000, 2000),
		new Point(12000, 10000),
		new Point(22000, 17000),
		new Point(25000, 1000),
		new Point(15000, 1000),
		new Point(19000, 28000),
		new Point(12000, 3000),
		new Point(4000, 15000),
		new Point(2000, 7000),
		new Point(18000, 27000),
		new Point(1000, 13000),
		new Point(9000, 26000),
		new Point(11000, 26000),
		new Point(6000, 16000),
		new Point(18000, 30000),
		new Point(18000, 26000),
		new Point(24000, 30000),
		new Point(10000, 25000),
		new Point(7000, 10000),
		new Point(19000, 24000),
		new Point(6000, 0),
		new Point(26000, 15000),
		new Point(1000, 23000),
		new Point(23000, 29000),
		new Point(15000, 7000),
		new Point(15000, 19000),
		new Point(17000, 31000),
		new Point(6000, 2000),
		new Point(17000, 16000),
		new Point(1000, 26000),
		new Point(11000, 19000),
		new Point(25000, 0),
		new Point(17000, 30000),
		new Point(16000, 22000),
		new Point(18000, 13000),
		new Point(3000, 23000),
		new Point(10000, 13000),
		new Point(1000, 9000),
		new Point(11000, 21000),
		new Point(29000, 19000),
		new Point(9000, 29000),
		new Point(30000, 3000),
		new Point(9000, 1000),
		new Point(5000, 29000),
		new Point(26000, 6000),
	];

	p.draw = function () {
		p.translate(padding, height - padding);
		p.scale(1 / 100, -1 / 100);

		for (const point of points) {
			point.draw();
		}
		// //fast collinear
		// const collinear = new FastCollinearPoints(points);
		// for (const segment of collinear.segments()) {
		// 	console.log(segment.toString());
		// 	segment.draw();
		// }
		//brute collinear
		const collinear2 = new BruteCollinearPoints(points);
		for (const segment of collinear2.segments()) {
			console.log(segment.toString());
			segment.draw();
		}
	};
};

new p5(sketch);
