export interface Scheduler {
  sleep(): Promise<void>;
  cleanUp(): void;
}
