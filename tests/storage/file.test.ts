import * as dotenv from "dotenv";
dotenv.config();

import { FileStorage } from "../../src/storage/file";

test("read", async () => {
  const f = new FileStorage();
  const videos = await f.getLatestPostedVideos();
  console.log(videos);
});

test("write", async () => {
  const f = new FileStorage();
  await f.addLatestPostedVideo("hello");
});
