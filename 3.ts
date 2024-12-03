///
/// PARSING
///

const data = Deno.readTextFileSync("3.dat");

///
/// Problem
///

const regex = /(do|don't|mul)\((?:([0-9]+)(?:,([0-9]+))*)?\)/gm;
const matches = data.matchAll(regex);

let totalPartOne = 0;
let totalPartTwo = 0;

let doing = true;

for (const match of matches.toArray()) {
  switch (match[1]) {
    case "do":
      doing = true;
      break;
    case "don't":
      doing = false;
      break;
    case "mul":
      totalPartOne += parseInt(match[2]) * parseInt(match[3]);
      if (doing) {
        totalPartTwo += parseInt(match[2]) * parseInt(match[3]);
      }
      break;
  }
}

console.log(totalPartOne);
console.log(totalPartTwo);
