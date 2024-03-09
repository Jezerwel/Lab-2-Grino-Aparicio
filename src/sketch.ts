export class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	draw(): void {
		p.stroke("black");
		p.strokeWeight(8);
		p.point(this.x, this.y);
	}

	drawTo(that: Point) {
		p.stroke("black");
		p.strokeWeight(2);
		p.line(this.x, this.y, that.x, that.y);
	}

	slopeTo(that: Point): number {
		if (this.x === that.x && this.y === that.y) {
			return -Infinity;
		} else if (this.x === that.x) {
			return Infinity;
		} else if (this.y === that.y) {
			return 0;
		} else {
			return (that.y - this.y) / (that.x - this.x);
		}
	}
}
