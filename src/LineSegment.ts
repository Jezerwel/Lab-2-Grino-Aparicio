import * as p5 from "p5";
import Point from "./point";

class LineSegment {
	p: Point;
	q: Point;

	constructor(p: Point, q: Point) {
		this.p = p;
		this.q = q;
	}

	draw(p: p5): void {
		p.stroke("black");
		p.strokeWeight(2);
		p.line(this.p.x, this.p.y, this.q.x, this.q.y);
	}
}

export default LineSegment;
