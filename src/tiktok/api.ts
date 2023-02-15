import { VideoMap } from "../types";

export interface ITikTokApi {
  getLatestLikedVideos(): Promise<VideoMap>;
}
