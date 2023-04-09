import * as dotenv from "dotenv";
dotenv.config();

import { processTags, TelegramApi } from "../../src/telegram/impl";

test.skip("sendMessage", async () => {
  const api = new TelegramApi();
  await api.sendVideo({
    path: "/home/turikhay/Y_9fidLK_r_21.mp4",
    video: {
      __og: "test download",
      sourceUrl: "https://foo/download",
      url: "https://foo",
      id: "Y_9fidLK_r_21",
      description: "hello #foo #bar",
    },
    contentType: "video/mp4",
    tags: new Set(["#foo", "#bar"]),
  });
}, 60000);

test("processTags", async () => {
  expect(processTags(["#foo", "#bar"])).toEqual("\\#foo \\#bar");
  expect(processTags(["#всем_привет", "#как_дела"])).toEqual(
    "\\#всем\\_привет \\#как\\_дела"
  );
});
