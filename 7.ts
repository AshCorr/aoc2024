///
/// PARSING
///

const data = Deno.readTextFileSync("7.dat");

const lines: [number, number[]][] = [];

for (const line of data.split("\n")) {
  const split = line.split(":");
  const expected = parseInt(split[0]);

  const numbers = split[1]
    .trim()
    .split(" ")
    .map((n) => parseInt(n));

  const done: [number, number[]] = [expected, numbers];
  lines.push(done);
}

///
/// Problem
///

const addOrMultiplyIsExpected = (
  expected: number,
  previous: number,
  left: number[],
  partTwo: boolean = false
): boolean => {
  const next = left[0];
  const leftOver = left.slice(1);

  if (leftOver.length === 0) {
    if (previous + next === expected) {
      return true;
    }
    if (previous * next === expected) {
      return true;
    }
    if (`${previous}${next}` === `${expected}` && partTwo) {
      return true;
    }

    return false;
  }

  return (
    addOrMultiplyIsExpected(expected, previous + next, leftOver, partTwo) ||
    addOrMultiplyIsExpected(expected, previous * next, leftOver, partTwo) ||
    (partTwo &&
      addOrMultiplyIsExpected(
        expected,
        parseInt(`${previous}${next}`),
        leftOver,
        partTwo
      ))
  );
};

let totalPartOne = 0;
let totalPartTwo = 0;

for (const line of lines) {
  const expected = line[0];
  const numbers = line[1];

  if (addOrMultiplyIsExpected(expected, numbers[0], numbers.slice(1))) {
    totalPartOne += expected;
  }

  if (addOrMultiplyIsExpected(expected, numbers[0], numbers.slice(1), true)) {
    totalPartTwo += expected;
  }
}

console.log(totalPartOne);
console.log(totalPartTwo);
