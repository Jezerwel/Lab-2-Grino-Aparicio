import Point from "./point";
import fs from "fs";
import path from "path";

function readPointsFromFile(filePath: string): Point[] {
	const points: Point[] = [];
	const fileContents = fs.readFileSync(
		path.join(__dirname, "..", "..", "data", filePath),
		"utf8",
	);
	const lines = fileContents.trim().split("\n");

	const numPoints = parseInt(lines[0], 10);

	for (let i = 1; i <= numPoints; i++) {
		const [x, y] = lines[i].trim().split(" ").map(Number);
		points.push(new Point(x, y));
	}

	return points;
}

export default readPointsFromFile;
