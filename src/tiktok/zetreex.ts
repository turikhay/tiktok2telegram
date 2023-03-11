import axios, { AxiosResponse } from "axios";
import { logger } from "../logging";

import { Url, VideoMap } from "../types";
import { ITikTokApi } from "./api";

const host =
  "tiktok-unauthorized-api-scraper-no-watermark-analytics-feed.p.rapidapi.com";

export class ZetreexTikTokApi implements ITikTokApi {
  constructor(
    private ttSecUid: string = process.env.TIKTOK_SEC_UID,
    private rapidApiKey: string = process.env.RAPIDAPI_KEY
  ) {}

  async getLatestLikedVideos(): Promise<VideoMap> {
    const { data } = await axios.post<
      LikedResponse,
      AxiosResponse<LikedResponse>,
      LikedRequest
    >(
      `https://${host}/api/liked`,
      {
        sid: this.ttSecUid,
        amount_of_posts: 0,
      },
      {
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": this.rapidApiKey,
          "X-RapidAPI-Host": host,
        },
      }
    );
    const map: VideoMap = new Map();
    data.posts
      .filter((post) => {
        const isMp3 = post.play_links[0].endsWith(".mp3");
        if (isMp3) {
          logger.info(`Filtering audio-only TikTok: ${post.web_link}`);
        }
        return !isMp3;
      })
      .forEach((post) =>
        map.set(post.aweme_id, {
          id: post.aweme_id,
          sourceUrl: post.play_links[0],
          url: post.web_link,
          description: post.description,
        })
      );
    return map;
  }
}

type LikedRequest = {
  sid: string;
  amount_of_posts: number;
};

type LikedResponse = {
  posts: Post[];
};

type Post = {
  play_links: Url[];
  aweme_id: string;
  web_link: string;
  description: string;
};
