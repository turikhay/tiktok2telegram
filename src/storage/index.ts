import { VideoId } from "../types";

export interface Storage {
  getNonPostedVideoIds(set: Iterable<VideoId>): Promise<VideoId[]>;
  addToPostedVideoIds(id: VideoId): Promise<void>;
}
