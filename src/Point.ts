export default class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	draw(): void {
		stroke("black");
		strokeWeight(500);
		point(this.x, this.y);
	}

	drawTo(that: Point) {
		stroke("black");
		strokeWeight(500);
		line(this.x, this.y, that.x, that.y);
	}
	compareTo(that: Point): number {
		if (this.y < that.y) {
			return -1;
		} else if (this.y > that.y) {
			return 1;
		} else if (this.x < that.x) {
			return -1;
		} else if (this.x > that.x) {
			return 1;
		} else {
			return 0;
		}
	}
	slopeTo(that: Point): number {
		if (this.x === that.x && this.y === that.y) {
			return Number.NEGATIVE_INFINITY;
		} else if (this.y === that.y) {
			return 0;
		} else if (this.x === that.x) {
			return Number.POSITIVE_INFINITY;
		} else {
			return (that.y - this.y) / (that.x - this.x);
		}
	}
}
