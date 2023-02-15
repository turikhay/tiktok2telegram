import { readFile, writeFile } from "fs/promises";

import { Storage } from ".";
import { logger } from "../logging";
import { FilePath, VideoId } from "../types";

export class FileStorage implements Storage {
  constructor(private path: FilePath = process.env.STORAGE_FILE) {}

  async getLatestPostedVideos(): Promise<Set<VideoId>> {
    const contents = await readFileContents(this.path);
    return new Set(contents.videos);
  }

  async addLatestPostedVideo(id: VideoId): Promise<void> {
    const videos = (await this.getLatestPostedVideos()).add(id);
    await writeFileContents(this.path, {
      videos: Array.from(videos),
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
