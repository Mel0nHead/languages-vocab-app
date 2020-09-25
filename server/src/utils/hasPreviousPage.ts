import { Word } from "../entity/Word";

export function hasPreviousPage(edges: Word[], last?: number) {
  if (last) {
    if (edges.length > last) {
      return true;
    }
    // TODO: check if elements exist prior to 'after': if they do, return 'true'
  }
  return false;
}
