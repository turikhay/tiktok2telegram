import { Artifact } from "../types";

export interface IReencoder {
  reencode(input: Artifact): Promise<Artifact>;
}

export const NoopEncoder: IReencoder = Object.freeze({
  async reencode(input: Artifact) {
    return input;
  },
});
