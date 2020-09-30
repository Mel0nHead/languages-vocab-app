import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { getAllWords } from "../generated-graphql-interfaces";

export const getNextWordGql = gql`
  query getAllWords {
    getWords(getWordsArgs: {}) {
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

export function useGetNextWordQuery() {
  return useQuery<getAllWords>(getNextWordGql);
}
