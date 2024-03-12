import * as p5 from "p5";
import Point from "./point";
import LineSegment from "./LineSegment";
import BruteCollinearPoints from "./BruteCollinearPoints";
import FastCollinearPoints from "./FastCollinearPoints";
import readPointsFromFile from "./readFIle";

const points: Point[] = readPointsFromFile("../test data/input8.txt");

let bruteCollinearPoints: BruteCollinearPoints;
let fastCollinearPoints: FastCollinearPoints;

const sketch = (p: p5) => {
	p.setup = () => {
		p.createCanvas(800, 600);
		bruteCollinearPoints = new BruteCollinearPoints(points);
		fastCollinearPoints = new FastCollinearPoints(points);

		console.log("Brute Force Solution:");
		bruteCollinearPoints.segments().forEach((segment) => {
			console.log(segment);
			segment.draw(p);
		});

		console.log("Fast Solution:");
		fastCollinearPoints.segments().forEach((segment) => {
			console.log(segment);
			segment.draw(p);
		});
	};

	p.draw = () => {
		p.background(255);
		points.forEach((point) => point.draw(p));
	};
};

new p5(sketch);
