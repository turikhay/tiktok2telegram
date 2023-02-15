import { VideoId } from "../types";

export interface Storage {
  getLatestPostedVideos(): Promise<Set<VideoId>>;
  addLatestPostedVideo(id: VideoId): Promise<void>;
}
