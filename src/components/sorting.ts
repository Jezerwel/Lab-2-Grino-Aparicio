import Point from "./Point";

function mergeSort(points: Point[], origin: Point): Point[] {
  if (points.length <= 1) {
    return points;
  }

  const middle = Math.floor(points.length / 2);
  const left = points.slice(0, middle);
  const right = points.slice(middle);

  return merge(mergeSort(left, origin), mergeSort(right, origin), origin);
}

function merge(left: Point[], right: Point[], origin: Point): Point[] {
  let result: Point[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const slopeLeft = origin.slopeTo(left[leftIndex]);
    const slopeRight = origin.slopeTo(right[rightIndex]);

    if (slopeLeft < slopeRight) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else if (slopeLeft > slopeRight) {
      result.push(right[rightIndex]);
      rightIndex++;
    } else {
      const sameSlope = [left[leftIndex], right[rightIndex]];
      while (
        leftIndex < left.length &&
        origin.slopeTo(left[leftIndex]) === slopeLeft
      ) {
        sameSlope.push(left[leftIndex]);
        leftIndex++;
      }
      while (
        rightIndex < right.length &&
        origin.slopeTo(right[rightIndex]) === slopeRight
      ) {
        sameSlope.push(right[rightIndex]);
        rightIndex++;
      }
      result = result.concat(sameSlope.sort((a, b) => a.compareTo(b)));
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

export { mergeSort };
