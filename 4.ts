///
/// PARSING
///

const data = Deno.readTextFileSync("4.dat");
const characters = data.split("\n").map((line) => line.split(""));

///
/// Problem
///

const xmas = ["X", "M", "A", "S"];
const xmasDirections = [
  // Horizontal
  [1, 0],
  [-1, 0],
  // Vertical
  [0, 1],
  [0, -1],
  // Diagonal (Bottom left to top right)
  [1, 1],
  [-1, -1],
  // Diagonal (Top left to bottom right)
  [1, -1],
  [-1, 1],
];

const lookForWord = (
  grid: string[][],
  word: string[],
  x: number,
  y: number,
  delta: number[]
): boolean => {
  const [xDelta, yDelta] = delta;

  // Avoid going out of bounds on X axis
  if (
    x + xDelta * (word.length - 1) < 0 ||
    x + xDelta * (word.length - 1) >= grid.length
  ) {
    return false;
  }

  // Avoid going out of bounds on Y axis
  if (
    y + yDelta * (word.length - 1) < 0 ||
    y + yDelta * (word.length - 1) >= grid[0].length
  ) {
    return false;
  }

  for (let i = 0; i < word.length; i++) {
    if (grid[y + yDelta * i][x + xDelta * i] !== word[i]) {
      return false;
    }
  }

  return true;
};

const lookForXMas = (grid: string[][], x: number, y: number) => {
  // Current square should be A
  if (grid[y][x] !== "A") {
    return false;
  }

  // Avoid going out of bounds on X axis
  if (x - 1 < 0 || x + 1 >= grid[0].length) {
    return false;
  }

  // Avoid going out of bounds on Y axis
  if (y - 1 < 0 || y + 1 >= grid.length) {
    return false;
  }

  // Diagonal top left to bottom right should be MAS or SAM
  if (
    !(grid[y - 1][x - 1] === "M" && grid[y + 1][x + 1] === "S") &&
    !(grid[y - 1][x - 1] === "S" && grid[y + 1][x + 1] === "M")
  ) {
    return false;
  }

  // Diagonal bottom left to top right should be MAS or SAM
  if (
    !(grid[y + 1][x - 1] === "M" && grid[y - 1][x + 1] === "S") &&
    !(grid[y + 1][x - 1] === "S" && grid[y - 1][x + 1] === "M")
  ) {
    return false;
  }

  return true;
};

let totalPartOne = 0;
let totalPartTwo = 0;

for (let y = 0; y < characters.length; y++) {
  for (let x = 0; x < characters[y].length; x++) {
    for (const direction of xmasDirections) {
      if (lookForWord(characters, xmas, x, y, direction)) {
        totalPartOne++;
      }
    }

    if (lookForXMas(characters, x, y)) {
      totalPartTwo++;
    }
  }
}

console.log(totalPartOne);
console.log(totalPartTwo);
