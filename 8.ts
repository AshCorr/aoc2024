///
/// PARSING
///

const data = Deno.readTextFileSync("8.dat");
const grid = data.split("\n").map((line) => line.split(""));

///
/// Problem
///

type Coordinate = [number, number];
const antennae: Map<string, Coordinate[]> = new Map();
const antinodes: Set<string> = new Set();
const antinodesPartTwo: Set<string> = new Set();

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === ".") continue;

    antennae.set(grid[y][x], [...(antennae.get(grid[y][x]) ?? []), [y, x]]);
  }
}

for (const coordinates of antennae.values()) {
  for (const [ay, ax] of coordinates) {
    for (const [by, bx] of coordinates) {
      // skip if the same antenna
      if (ay == by && ax == bx) continue;

      // Calculate distance between two antennae

      const deltaY = ay - by;
      const deltaX = ax - bx;

      // Antinode is at the current position of the first antenna + delta
      let antinodeY = ay + deltaY;
      let antinodeX = ax + deltaX;

      // Is antinode within the grid
      if (
        antinodeX < 0 ||
        antinodeX >= grid[0].length ||
        antinodeY < 0 ||
        antinodeY >= grid.length
      ) {
        continue;
      }

      antinodes.add(`${antinodeY},${antinodeX}`);
      antinodesPartTwo.add(`${antinodeY},${antinodeX}`);
      antinodesPartTwo.add(`${by},${bx}`);
      antinodesPartTwo.add(`${ay},${ax}`);

      while (true) {
        // Antinode is at the current position of the first antenna + delta
        antinodeY = antinodeY + deltaY;
        antinodeX = antinodeX + deltaX;

        // Is antinode within the grid
        if (
          antinodeX < 0 ||
          antinodeX >= grid[0].length ||
          antinodeY < 0 ||
          antinodeY >= grid.length
        ) {
          break;
        }

        antinodesPartTwo.add(`${antinodeY},${antinodeX}`);
      }
    }
  }
}

console.log(antinodes.size);
console.log(antinodesPartTwo.size);
