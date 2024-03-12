import * as p5 from "p5";

class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	draw(p: p5): void {
		p.stroke("black");
		p.strokeWeight(8);
		p.point(this.x, this.y);
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

export default Point;
