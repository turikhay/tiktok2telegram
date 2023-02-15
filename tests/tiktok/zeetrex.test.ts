import * as dotenv from "dotenv";
dotenv.config();

import { ZetreexTikTokApi } from "../../src/tiktok/zetreex";

test.skip("zeetrex", async () => {
  const api = new ZetreexTikTokApi();
  const videos = await api.getLatestLikedVideos();
  console.log(videos);
}, 25000);
