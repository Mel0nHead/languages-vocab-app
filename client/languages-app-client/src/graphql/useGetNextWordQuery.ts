import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { getWords, getWordsVariables } from "../generated-graphql-interfaces";

export const getNextWordGql = gql`
  query getWords($first: Int, $after: String, $userId: ID!) {
    getWords(getWordsArgs: { first: $first, after: $after, userId: $userId }) {
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

export function useGetNextWordQuery(
  first: number,
  after: string | null,
  userId: string
) {
  return useQuery<getWords, getWordsVariables>(getNextWordGql, {
    variables: { first, after, userId },
  });
}
