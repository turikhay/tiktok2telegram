import { readFile, writeFile } from "fs/promises";

import { Storage } from ".";
import { logger } from "../logging";
import { FilePath, VideoId } from "../types";

export class FileStorage implements Storage {
  constructor(private path: FilePath = process.env.STORAGE_FILE) {}

  async getNonPostedVideoIds(set: Iterable<VideoId>): Promise<VideoId[]> {
    const diff = new Set<VideoId>(set);
    const contents = await readFileContents(this.path);
    contents.videos.forEach((alreadyPosted) => diff.delete(alreadyPosted));
    return Array.from(diff);
  }

  async addToPostedVideoIds(id: VideoId): Promise<void> {
    const set = new Set((await readFileContents(this.path)).videos);
    set.add(id);
    await writeFileContents(this.path, {
      videos: Array.from(set),
    });
  }
}

type Contents = {
  videos: VideoId[];
};

async function readFileContents(path: FilePath): Promise<Contents> {
  try {
    return JSON.parse(await readFile(path, { encoding: "utf-8" }));
  } catch (e) {
    logger.error(`Couldn't read ${path}`, e);
    return createDefaultContents();
  }
}

async function writeFileContents(
  path: FilePath,
  contents: Contents
): Promise<void> {
  try {
    await writeFile(path, JSON.stringify(contents));
  } catch (e) {
    logger.error(`Couldn't write ${path}`);
  }
}

function createDefaultContents(): Contents {
  return {
    videos: [],
  };
}
