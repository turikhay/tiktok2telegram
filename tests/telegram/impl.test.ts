import * as dotenv from "dotenv";
dotenv.config();

import { TelegramApi } from "../../src/telegram/impl";

test.skip("sendMessage", async () => {
  const api = new TelegramApi();
  await api.sendVideo({
    path: "/home/turikhay/Y_9fidLK_r_21.mp4",
    video: {
      sourceUrl: "https://foo/download",
      url: "https://foo",
      id: "Y_9fidLK_r_21",
      description: "hello #foo #bar",
    },
    contentType: "video/mp4",
    tags: new Set(["#foo", "#bar"]),
  });
}, 60000);
