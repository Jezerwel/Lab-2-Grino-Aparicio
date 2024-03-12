import p5 from "p5";
import Point from "./point";

const width: number = 800;
const height: number = 500;
const padding: number = 50;

const sketch = function (p) {
	// biome-ignore lint/complexity/useArrowFunction: <explanation>
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
			// DO NOT MODIFY

			p.stroke("black");
			p.strokeWeight(800);
			p.point(this.x, this.y);
		}

		drawTo(that: Point) {
			// DO NOT MODIFY

			p.stroke("black");
			p.strokeWeight(200);
			p.line(this.x, this.y, that.x, that.y);
		}

		slopeTo(that: Point): number {}
	}

	class LineSegment {
		p: Point;
		q: Point;

		constructor(p: Point, q: Point) {
			// DO NOT MODIFY

			this.p = p;
			this.q = q;
		}

		draw(): void {
			// DO NOT MODIFY

			p.stroke("black");
			p.strokeWeight(2);
			p.line(this.p.x, this.p.y, this.q.x, this.q.y);
		}

		toString(): string {
			// DO NOT MODIFY

			return `${this.p} -> ${this.q}`;
		}
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
								this.lineSegments.add(new LineSegment(p, s));
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

	// Declare your point objects here~
	// const point = new Point(19000, 10000);
	// const point2 = new Point(10000, 10000);

	// from input6.txt
	const points: Point[] = [
		new Point(19000, 10000),
		new Point(18000, 10000),
		new Point(32000, 10000),
		new Point(21000, 10000),
		new Point(1234, 5678),
		new Point(14000, 10000),
	];

	p.draw = function () {
		p.translate(padding, height - padding);
		p.scale(1 / 100, -1 / 100);

		// Call your draw and drawTo here.

		// point.draw();
		// point2.draw();
		// point.drawTo(point2);

		for (const point of points) {
			point.draw();
		}

		const collinear = new FastCollinearPoints(points);
		for (const segment of collinear.segments()) {
			console.log(segment.toString());
			segment.draw();
		}
	};
};

new p5(sketch);
