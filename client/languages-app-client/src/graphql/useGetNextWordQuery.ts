import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export function useGetNextWordQuery(first: number, after: string | null) {
  return useQuery(
    gql`
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
    `,
    { variables: { first, after } }
  );
}
