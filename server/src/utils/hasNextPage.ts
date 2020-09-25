import { Word } from "../entity/Word";

export function hasNextPage(edges: Word[], first?: number) {
  if (first) {
    if (edges.length > first) {
      return true;
    }
    // TODO: check if elements exist after 'before': if they do, return 'true'
  }
  return false;
}
