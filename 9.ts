///
/// PARSING
///

const data = Deno.readTextFileSync("9.dat");

///
/// Problem
///

type Block = {
  id: number;
  length: number;
};
const checksum = (filesystem: number[]): number => {
  let total = 0;
  let skipped = 0;
  for (let i = 0; i < filesystem.length; i++) {
    if (filesystem[i] === -1) {
      continue;
    }

    total += filesystem[i] * (i - skipped);
  }

  return total;
};

const partOne = (disk: number[]): number[] => {
  let end = disk.length - 1;
  let cursor = 0;

  while (cursor < end) {
    if (disk[cursor] !== -1) {
      cursor++;
      continue;
    }

    if (disk[end] === -1) {
      end--;
      continue;
    }

    disk[cursor] = disk[end];
    disk[end] = -1;
  }

  return disk;
};

const partTwo = (blocks: Block[]): number[] => {
  for (let end = blocks.length - 1; end >= 0; end--) {
    if (blocks[end].id === -1) {
      continue;
    }

    for (let start = 0; start < end; start++) {
      if (blocks[start].id !== -1) {
        continue;
      }

      if (blocks[start].length === blocks[end].length) {
        blocks[start].id = blocks[end].id;
        blocks[end].id = -1;

        break;
      }

      if (blocks[start].length > blocks[end].length) {
        const originalSize = blocks[start].length;
        blocks[start].length = blocks[end].length;
        blocks[start].id = blocks[end].id;
        blocks[end].id = -1;

        blocks.splice(start + 1, 0, {
          id: -1,
          length: originalSize - blocks[start].length,
        });

        break;
      }
    }
  }

  return blocks.flatMap((block) => Array(block.length).fill(block.id));
};

const uncompressedDisk: number[] = [];
const blocks: Block[] = [];

let nextFileId = 0;
for (let i = 0; i < data.length; i++) {
  const size = parseInt(data[i]);
  const fileId = i % 2 === 0 ? nextFileId : -1;

  if (i % 2 === 0) {
    nextFileId++;
  }

  blocks.push({ id: fileId, length: size });

  for (let i = 0; i < size; i++) {
    uncompressedDisk.push(fileId);
  }
}

console.log(checksum(partOne([...uncompressedDisk])));
console.log(checksum(partTwo([...blocks])));
