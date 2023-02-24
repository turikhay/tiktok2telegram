import { mkdtemp, readFile, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { FileStorage } from "../../src/storage/file";

test("read", async () => {
  const storage = new FileStorage(await createTempFile());
  return expect(
    storage.getNonPostedVideoIds(new Set([...POSTED_VIDEOS, "unposted"]))
  ).resolves.toEqual(["unposted"]);
});

test("write", async () => {
  const file = await createTempFile();
  const storage = new FileStorage(file);
  await storage.addToPostedVideoIds("newly_posted");
  expect(JSON.parse(await readFile(file, { encoding: "utf-8" }))).toEqual({
    videos: [...POSTED_VIDEOS, "newly_posted"],
  });
});

const POSTED_VIDEOS = ["foo", "bar"] as const;

async function createTempFile() {
  const tmpFolder = await mkdtemp(join(tmpdir(), "tiktoktest"));
  const file = join(tmpFolder, "storage.json");
  await writeFile(
    file,
    JSON.stringify({
      videos: POSTED_VIDEOS,
    })
  );
  return file;
}
