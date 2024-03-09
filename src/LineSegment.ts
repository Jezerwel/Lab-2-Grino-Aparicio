export class LineSegment {
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
}
