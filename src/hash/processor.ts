import { HashTagFilter } from "./filter";
import { FileBasedHashTagFilter } from "./filter/file";
import { DefaultHashTagParser, HashTag, HashTagParser } from "./parser";

export class HashProcessor {
  constructor(
    private parser: HashTagParser = DefaultHashTagParser,
    private filter: HashTagFilter = new FileBasedHashTagFilter(),
    private limit: number = 4
  ) {}

  async process(description: string): Promise<Set<HashTag>> {
    let tags = this.parser.parse(description);
    if (this.limit > 0 && tags.length > this.limit) {
      tags = tags.slice(0, this.limit);
    }
    return await this.filter.filter(new Set(tags));
  }
}
