import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

// apollo client:codegen --outputFlat  --endpoint=http://localhost:4000/graphql --target=typescript ./src/generated-graphql-interfaces.ts
export const getNextWordGql = gql`
  query getWords($first: Int, $after: String) {
    getWords(getWordsArgs: { first: $first, after: $after }) {
      totalCount
      edges {
        node {
          id
          originalWord
          translatedWord
          dateLastSeen
          dateAdded
          language
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

export function useGetNextWordQuery(first: number, after: string | null) {
  return useQuery(getNextWordGql, { variables: { first, after } });
}
