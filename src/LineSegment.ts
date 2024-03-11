import Point from "./Point";

export default class LineSegment {
	p: Point;
	q: Point;

	constructor(p: Point, q: Point) {
		this.p = p;
		this.q = q;
	}

	draw(): void {
		stroke("black");
		strokeWeight(2);
		line(this.p.x, this.p.y, this.q.x, this.q.y);
	}
}
