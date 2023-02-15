import { Artifact, Url } from "../types";

export interface IDownloader {
  download(url: Url): Promise<Artifact>;
}
