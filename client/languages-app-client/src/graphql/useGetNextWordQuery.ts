import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const getNextWordGql = gql`
  query getWords($first: Int, $after: String) {
    getAllWords(first: $first, after: $after) {
      totalCount
      edges {
        node {
          id
          originalWord
          translatedWord
          dateLastSeen
          dateAdded
          box
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
