declare namespace NodeJS {
  export interface ProcessEnv {
    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_CHANNEL_ID: string;
    TELEGRAM_OWNER_ID: string;

    TIKTOK_SEC_UID: string;
    TIKTOK_CHECK_PERIOD_MIN: string;
    TIKTOK_CHECK_PERIOD_MAX: string;

    RAPIDAPI_KEY: string;

    STORAGE_FILE: string;
    EXCLUDED_HASHTAGS_FILE: string;
  }
}
