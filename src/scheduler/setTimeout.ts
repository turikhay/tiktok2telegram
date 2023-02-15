import { Scheduler } from ".";

export class SetTimeoutScheduler implements Scheduler {
  private timers = new Set<NodeJS.Timeout>();

  constructor(
    private minMs: number = parseInt(process.env.TIKTOK_CHECK_PERIOD_MIN),
    private maxMs: number = parseInt(process.env.TIKTOK_CHECK_PERIOD_MAX)
  ) {}

  sleep(): Promise<void> {
    return new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        this.timers.delete(timer);
        resolve();
      }, Math.random() * (this.maxMs - this.minMs) + this.minMs);
      this.timers.add(timer);
    });
  }

  cleanUp(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }
}
