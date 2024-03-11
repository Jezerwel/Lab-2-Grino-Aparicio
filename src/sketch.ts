import Point from "./Point";
import LineSegment from "./LineSegment";
import BruteCollinearPoints from "./BruteCollinearPoints";
import FastCollinearPoints from "./FastCollinearPoints";
import readPointsFromFile from "./ReadFile";

const points: Point[] = readPointsFromFile("./test data/input8.txt");

let bruteCollinearPoints: BruteCollinearPoints;
let fastCollinearPoints: FastCollinearPoints;

function setup() {
	createCanvas(800, 600);
	bruteCollinearPoints = new BruteCollinearPoints(points);
	fastCollinearPoints = new FastCollinearPoints(points);

	console.log("Brute Force Solution:");
	bruteCollinearPoints.segments().forEach((segment) => {
		console.log(segment);
		segment.draw();
	});

	console.log("Fast Solution:");
	fastCollinearPoints.segments().forEach((segment) => {
		console.log(segment);
		segment.draw();
	});
}

function draw() {
	background(255);
	points.forEach((point) => point.draw());
}
