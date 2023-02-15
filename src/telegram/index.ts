import { HashTag } from "../hash/parser";
import { ContentType, FilePath, Video } from "../types";

export type VideoUpload = {
  path: FilePath;
  video: Video;
  contentType: ContentType | undefined;
  tags: Set<HashTag>;
};

export interface ITelegramApi {
  sendMessage(message: string): void;
  sendVideo(upload: VideoUpload): Promise<void>;
}
