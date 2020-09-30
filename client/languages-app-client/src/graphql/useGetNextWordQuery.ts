import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { getWords, getWordsVariables } from "../generated-graphql-interfaces";

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
  return useQuery<getWords, getWordsVariables>(getNextWordGql, {
    variables: { first, after },
  });
}
