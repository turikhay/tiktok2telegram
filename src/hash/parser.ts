export type HashTag = `#${string}`;

export function isHashTag(s: string): s is HashTag {
  return s.startsWith("#");
}

export interface HashTagParser {
  parse(str: string): HashTag[];
}

export const DefaultHashTagParser: HashTagParser = Object.freeze({
  parse(str: string) {
    const regex = /(#[a-zа-я_\d]+)/gim;
    const matches: HashTag[] = [];

    let match: ReturnType<typeof regex.exec>;
    while ((match = regex.exec(str))) {
      matches.push(match[1] as unknown as HashTag);
    }

    return matches;
  },
});
