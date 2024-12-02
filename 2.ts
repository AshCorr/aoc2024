///
/// PARSING
///

const data = Deno.readTextFileSync("2.dat");

const lines = data.split("\n");

const levels: number[][] = [];

for (const line of lines) {
  levels.push(line.split(" ").map((n) => parseInt(n)));
}

///
/// Problem
///

const findUnsafeLevel = (level: number[]) => {
  const decreasing = level[0] > level[1];

  for (let i = 1; i < level.length; i++) {
    const current = level[i];
    const previous = level[i - 1];

    if (Math.abs(current - previous) == 0 || Math.abs(current - previous) > 3) {
      return i;
    }

    if (previous > current && !decreasing) {
      return i;
    }

    if (previous < current && decreasing) {
      return i;
    }
  }

  return -1;
};

let totalPartOne = 0;
let totalPartTwo = 0;

for (const level of levels) {
  const firstAttempt = findUnsafeLevel(level);

  // Missing the first or second number could impact whether the level as a whole is increasing or decreasing
  const missingFirst = level.toSpliced(0, 1);
  const missingSecond = level.toSpliced(1, 1);
  // Missing the first or second number could impact whether the level as a whole is increasing or decreasing
  const missingNth = level.toSpliced(firstAttempt, 1);

  if (firstAttempt === -1) {
    totalPartOne++;
    totalPartTwo++;
  } else if (
    findUnsafeLevel(missingFirst) === -1 ||
    findUnsafeLevel(missingSecond) === -1 ||
    findUnsafeLevel(missingNth) === -1
  ) {
    totalPartTwo++;
  }
}

console.log(totalPartOne);
console.log(totalPartTwo);
