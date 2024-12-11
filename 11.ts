///
/// PARSING
///

console.time("Day");
const data = Deno.readTextFileSync("11.dat");
const stones: number[] = data.split(" ").map((n) => parseInt(n));

///
/// Problem
///

const previouslySeen: Map<string, number> = new Map();

const blinkStone = (stone: number, times: number): number => {
  if (times === 0) {
    return 1;
  }

  const previous = previouslySeen.get(`${stone},${times}`);

  if (previous) {
    return previous;
  }

  let result = 0;
  if (stone === 0) {
    result = blinkStone(1, times - 1);
  } else if (`${stone}`.length % 2 === 0) {
    const left = parseInt(`${stone}`.slice(0, `${stone}`.length / 2));
    const right = parseInt(`${stone}`.slice(`${stone}`.length / 2));

    result = blinkStone(left, times - 1) + blinkStone(right, times - 1);
  } else {
    result = blinkStone(stone * 2024, times - 1);
  }

  previouslySeen.set(`${stone},${times}`, result);

  return result;
};

const blink = (stones: number[], blinks: number): number => {
  let length = 0;

  for (let i = 0; i < stones.length; i++) {
    const result = blinkStone(stones[i], blinks);
    length += result;
  }

  return length;
};

console.log(blink(stones, 25));
console.log(blink(stones, 75));
