const data = Deno.readTextFileSync("1.dat");

const lines = data.split("\n");

const left = [];
const right = [];
const numbers: Map<number, number> = new Map();

for (const line of lines) {
  const [l, r] = line.split("   ");

  left.push(parseInt(l));

  const rightNumber = parseInt(r);
  right.push(rightNumber);
  numbers.set(rightNumber, (numbers.get(rightNumber) ?? 0) + 1);
}

left.sort();
right.sort();

let totalPartOne = 0;
let totalPartTwo = 0;

for (let i = 0; i < left.length; i++) {
  totalPartOne += Math.abs(left[i] - right[i]);

  totalPartTwo += (numbers.get(left[i]) ?? 0) * left[i];
}

console.log(totalPartOne);
console.log(totalPartTwo);
