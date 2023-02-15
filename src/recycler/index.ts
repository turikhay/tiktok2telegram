import { FilePath } from "../types";
import { rm } from "fs/promises";
import { logger } from "../logging";

// A little bit of over-engineering...

export interface IRecycler {
  recycle(path: FilePath): void;
}

export const ImmediateRecycler = Object.freeze({
  recycle(path: FilePath) {
    rm(path).catch((e) => {
      logger.warn(`Couldn't remove ${path}`, e);
    });
  },
});
