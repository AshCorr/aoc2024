///
/// PARSING
///

const data = Deno.readTextFileSync("10.dat");
const grid = data.split("\n").map((line) => line.split(""));

///
/// Problem
///

const walk = (
  x: number,
  y: number,
  previousHeight: number,
  visitedTrailtails: Set<string>,
  visistedTrails: Set<String>,
  trailHash: string
): number => {
  if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
    return 0;
  }

  const height = parseInt(grid[y][x]);

  if (height - 1 !== previousHeight) {
    return 0;
  }

  if (height === 9) {
    visistedTrails.add(trailHash);
    if (visitedTrailtails.has(`${x},${y}`)) {
      return 0;
    }
    visitedTrailtails.add(`${x},${y}`);
    return 1;
  }

  return (
    walk(
      x + 1,
      y,
      height,
      visitedTrailtails,
      visistedTrails,
      `${trailHash},${x + 1},${y}`
    ) +
    walk(
      x,
      y + 1,
      height,
      visitedTrailtails,
      visistedTrails,
      `${trailHash},${x},${y + 1}`
    ) +
    walk(
      x - 1,
      y,
      height,
      visitedTrailtails,
      visistedTrails,
      `${trailHash},${x - 1},${y}`
    ) +
    walk(
      x,
      y - 1,
      height,
      visitedTrailtails,
      visistedTrails,
      `${trailHash},${x},${y - 1}`
    )
  );
};

let totalPartOne = 0;
let totalPartTwo = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] !== "0") continue;

    const visistedTrails = new Set<string>();
    totalPartOne += walk(x, y, -1, new Set(), visistedTrails, `${x},${y}`);
    totalPartTwo += visistedTrails.size;
  }
}

console.log(totalPartOne);
console.log(totalPartTwo);
