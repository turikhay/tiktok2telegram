import * as dotenv from "dotenv";
dotenv.config();

import { FileBasedHashTagFilter } from "../../../src/hash/filter/file";
import { HashTag } from "../../../src/hash/parser";

test("readFileContents", async () => {
  const filter = new FileBasedHashTagFilter();
  expect(
    await filter.filter(new Set<HashTag>(["#fyp", "#foo", "#bar"]))
  ).toEqual(new Set<HashTag>(["#foo", "#bar"]));
  expect(
    await filter.filter(
      new Set<HashTag>(["#tiktok", "#tok", "#TikTok", "#real"])
    )
  ).toEqual(new Set<HashTag>(["#real"]));
});
