///
/// PARSING
///

const data = Deno.readTextFileSync("6.dat");
const grid = data.split("\n").map((line) => line.split(""));
grid.reverse();

///
/// Problem
///

// State
const directionVectors = [
  // Up
  [1, 0],
  // Right
  [0, 1],
  // Down
  [-1, 0],
  // Left
  [0, -1],
];

let x = -1;
let y = -1;

// [y, x] -> [distanceFromStart, direction]
const visited = new Set<string>();
const visitedPartTwo = new Set<string>();

// Find the starting position of the Guard
outer: for (let yy = 0; yy < grid.length; yy++) {
  for (let xx = 0; xx < grid[yy].length; xx++) {
    if (grid[yy][xx] === "^") {
      x = xx;
      y = yy;
      break outer;
    }
  }
}

const obstructionCheck = (
  startY: number,
  startX: number,
  directionVectors: number[][]
) => {
  let y = startY;
  let x = startX;

  const visited = new Set<string>();
  const obstruction = [y + directionVectors[0][0], x + directionVectors[0][1]];

  directionVectors.push(directionVectors.shift() ?? [0, 0]);

  while (true) {
    const nextY = y + directionVectors[0][0];
    const nextX = x + directionVectors[0][1];
    const direction = directionVectors[0];

    // Have we been in this position before? If so we're done and we've found a loop.
    if (visited.has(`${y},${x},${direction[0]},${direction[1]}`)) {
      return true;
    }

    // Is the next position off screen?
    // If so, we're done, there was no loop.
    if (
      nextY < 0 ||
      nextY >= grid.length ||
      nextX < 0 ||
      nextX >= grid[0].length
    ) {
      return false;
    }

    visited.add(`${y},${x},${direction[0]},${direction[1]}`);
    // Is the next position a wall or the obstruction?
    // Rotate 90 degrees if so
    if (
      grid[nextY]?.[nextX] === "#" ||
      (nextY === obstruction[0] && nextX === obstruction[1])
    ) {
      directionVectors.push(directionVectors.shift() ?? [0, 0]);
    } else {
      y = nextY;
      x = nextX;
    }
  }
};

while (true) {
  const nextY = y + directionVectors[0][0];
  const nextX = x + directionVectors[0][1];

  if (grid[nextY]?.[nextX] === "#") {
    directionVectors.push(directionVectors.shift() ?? [0, 0]);
  } else {
    // If we haven't visited the next position before
    // try putting an obstruction there and see if we end in a loop.
    if (
      !visited.has(`${nextY},${nextX}`) &&
      obstructionCheck(y, x, [...directionVectors])
    ) {
      visitedPartTwo.add(`${nextY},${nextX}`);
    }

    // I wish I had picked another language now...
    // I'm tired of converting arrays to strings
    visited.add(`${y},${x}`);

    if (
      nextY < 0 ||
      nextY >= grid.length ||
      nextX < 0 ||
      nextX >= grid[0].length
    ) {
      break;
    }

    x = nextX;
    y = nextY;
  }
}

console.log(visited.size);
console.log(visitedPartTwo.size);
