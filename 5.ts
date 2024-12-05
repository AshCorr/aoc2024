///
/// PARSING
///

const data = Deno.readTextFileSync("5.dat");

let finishedPageRules = false;
const pageRules: [number, number][] = [];
const updates: number[][] = [];

for (const line of data.split("\n")) {
  if (line.trim() === "") {
    finishedPageRules = true;
    continue;
  }

  if (!finishedPageRules) {
    const [a, b] = line.split("|");

    pageRules.push([parseInt(a), parseInt(b)]);
  } else {
    updates.push(line.split(",").map((n) => parseInt(n)));
  }
}

///
/// Problem
///

const pageRuleMap = new Map<number, number[]>();
for (const pageRule of pageRules) {
  pageRuleMap.set(pageRule[0], [
    ...(pageRuleMap.get(pageRule[0]) ?? []),
    pageRule[1],
  ]);
}

const isBefore = (firstPage: number, secondPage: number): number => {
  if (pageRuleMap.get(firstPage)?.includes(secondPage)) {
    return -1;
  }

  if (pageRuleMap.get(secondPage)?.includes(firstPage)) {
    return 1;
  }

  return 0;
};

let totalPartOne = 0;
let totalPartTwo = 0;

for (const update of updates) {
  const sorted = [...update].sort(isBefore);

  // An incredibly LAZY array comparison
  if (JSON.stringify(sorted) === JSON.stringify(update)) {
    totalPartOne += update[(update.length - 1) / 2];
  } else {
    totalPartTwo += sorted[(sorted.length - 1) / 2];
  }
}

console.log(totalPartOne);
console.log(totalPartTwo);
