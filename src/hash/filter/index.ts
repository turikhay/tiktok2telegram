import { HashTag } from "../parser";

export interface HashTagFilter {
  filter(tags: Set<HashTag>): Promise<Set<HashTag>>;
}
