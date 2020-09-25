import { Word } from "../entity/Word";

export function applyCursorsToEdges(
  allEdges: Word[],
  beforeCursor?: string,
  afterCursor?: string
) {
  let edges = allEdges;

  if (afterCursor) {
    const id = parseInt(Buffer.from(afterCursor, "base64").toString());
    edges = allEdges.filter((word) => word.id > id);
  }

  if (beforeCursor) {
    const id = parseInt(Buffer.from(beforeCursor, "base64").toString());
    edges = allEdges.filter((word) => word.id < id);
  }
  return edges;
}
