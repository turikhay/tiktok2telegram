import { ITelegramApi, VideoUpload } from ".";
import TelegramBot from "node-telegram-bot-api";
import { Semaphore } from "semaphore-promise";
import { logger } from "../logging";
import { HashTag } from "../hash/parser";

export type Chats = {
  author: string;
  targetChannel: string;
};

export class TelegramApi implements ITelegramApi {
  private chats: Readonly<Chats>;

  constructor(
    private bot: TelegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN),
    chats: Chats = {
      author: process.env.TELEGRAM_OWNER_ID,
      targetChannel: process.env.TELEGRAM_CHANNEL_ID,
    },
    private semaphore: Semaphore = new Semaphore(1)
  ) {
    this.chats = Object.freeze({ ...chats });
  }

  sendMessage(message: string): void {
    this.bot.sendMessage(this.chats.author, message).catch((e) => {
      logger.error(
        `Couldn't send message to author (${this.chats.targetChannel})`,
        e
      );
    });
  }

  async sendVideo({
    path,
    video,
    contentType,
    tags,
  }: VideoUpload): Promise<void> {
    const release = await this.semaphore.acquire();
    try {
      await this.bot.sendVideo(
        this.chats.targetChannel,
        path,
        {
          caption: processCaption(video.url, tags),
          parse_mode: "MarkdownV2",
        },
        {
          filename: `${video.id}.mp4`,
          contentType,
        }
      );
    } finally {
      release();
    }
  }
}

function processCaption(url: string, tags: Set<HashTag>): string {
  return `[TikTok](${url}) ${processTags(Array.from(tags))}`.trim();
}

export function processTags(tags: HashTag[]): string {
  return tags
    .map((tag) => tag.replace(/(_)/g, "\\$1"))
    .map((tag) => `\\${tag}`)
    .join(" ");
}
