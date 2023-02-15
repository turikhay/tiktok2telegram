import { readFile } from "fs/promises";

import { HashTagFilter } from ".";
import { FilePath } from "../../types";
import { HashTag, isHashTag } from "../parser";

export class FileBasedHashTagFilter implements HashTagFilter {
  constructor(private path: FilePath = process.env.EXCLUDED_HASHTAGS_FILE) {}

  async filter(input: Set<HashTag>): Promise<Set<HashTag>> {
    const output = new Set<HashTag>(input);
    const lines = await readFileContents(this.path);
    lines.forEach((line) => {
      if (isHashTag(line)) {
        const excludedTag = line;
        input.forEach((tag) => {
          if (tag.toLowerCase() == excludedTag) {
            output.delete(tag);
          }
        });
      } else {
        const word = line;
        input.forEach((tag) => {
          if (tag.toLowerCase().includes(word)) {
            output.delete(tag);
          }
        });
      }
    });
    return output;
  }
}

async function readFileContents(
  path: FilePath
): Promise<Set<string | HashTag>> {
  const tags = (await readFile(path, { encoding: "utf-8" }))
    .split("\n")
    .filter((t) => t !== "" && !t.includes(" "));
  return new Set<HashTag>(tags as unknown as HashTag[]);
}
