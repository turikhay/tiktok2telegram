import { Storage } from ".";
import { createClient } from "redis";
import { VideoId } from "../types";
import { logger } from "../logging";

type RedisClient = ReturnType<typeof createClient>;

export default class RedisStorage implements Storage {
  constructor(private client: RedisClient, private key: string) {}

  async getNonPostedVideoIds(set: Iterable<VideoId>): Promise<VideoId[]> {
    const args = Array.from(set);
    const map = new Map(args.map((v, i) => [i, v]));
    const result = await this.client.smIsMember(this.key, args);
    result.forEach((v, i) => {
      if (v) {
        map.delete(i);
      }
    });
    return Array.from(map.values());
  }

  async addToPostedVideoIds(id: string): Promise<void> {
    await this.client.sAdd(this.key, id);
  }
}

export async function createRedisStorage(
  url: string = process.env.REDIS_URL,
  key: string = process.env.REDIS_SET_KEY
) {
  const client = createClient({ url });
  client.on("error", (e) => logger.error("Redis error", e));
  await client.connect();
  return new RedisStorage(client, key);
}
