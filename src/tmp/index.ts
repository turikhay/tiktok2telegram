import { tmpdir } from "os";
import { join } from "path";
import { FilePath } from "../types";

export interface ITmpFileProvider {
  createUniquePath(): Promise<string>;
}

export class DirTmpFileProvider implements ITmpFileProvider {
  private counter: number = 0;

  constructor(private dir: FilePath) {}

  async createUniquePath(): Promise<string> {
    return join(this.dir, `tiktok-server-${this.counter++}`);
  }
}

export const DefaultTempFileProvider: ITmpFileProvider = new DirTmpFileProvider(
  tmpdir()
);
