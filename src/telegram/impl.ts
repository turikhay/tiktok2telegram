import { ITelegramApi, VideoUpload } from ".";
import TelegramBot from "node-telegram-bot-api";
import { Semaphore } from "semaphore-promise";
import { logger } from "../logging";

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
          caption: `[TikTok](${video.url}) ${Array.from(tags)
            .map((tag) => `\\${tag}`)
            .join(" ")}`.trim(),
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
