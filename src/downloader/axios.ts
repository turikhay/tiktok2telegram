import axios from "axios";
import { IDownloader } from ".";
import { Artifact } from "../types";
import { writeFile } from "fs/promises";
import { Stream } from "stream";
import { DefaultTempFileProvider, ITmpFileProvider } from "../tmp";
import { ImmediateRecycler, IRecycler } from "../recycler";
import { logger } from "../logging";

export class AxiosDownloader implements IDownloader {
  constructor(
    private tmp: ITmpFileProvider = DefaultTempFileProvider,
    private recycler: IRecycler = ImmediateRecycler
  ) {}

  async download(url: string): Promise<Artifact> {
    const { data: stream, headers } = await axios.get<Stream>(url, {
      responseType: "stream",
      onDownloadProgress(progressEvent) {
        logger.info(
          `Downloading ${url}: ${(progressEvent.progress ?? Number.NaN) * 100}%`
        );
      },
    });
    const dest = await this.tmp.createUniquePath();
    try {
      await writeFile(dest, stream);
    } catch (e) {
      this.recycler.recycle(dest);
      throw e;
    }
    const contentType = headers["Content-Type"];
    return {
      path: dest,
      contentType: typeof contentType !== "string" ? undefined : contentType,
    };
  }
}
