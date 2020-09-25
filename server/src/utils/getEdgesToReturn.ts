import { Word } from "../entity/Word";

export function getEdgesToReturn(edges: Word[], first?: number, last?: number) {
  let edgesToReturn = edges;
  if (first) {
    if (first < 0) {
      throw new Error("'First' cannot be less than 0");
    }
    if (edges.length > first) {
      edgesToReturn = edges.slice(0, first);
    }
  }
  if (last) {
    if (last < 0) {
      throw new Error("'Last' cannot be less than 0");
    }
    if (edges.length > last) {
      edgesToReturn = edges.slice(-last);
    }
  }
  return edgesToReturn;
}
