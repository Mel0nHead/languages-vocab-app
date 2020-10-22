import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { getAllWords } from "../generated-graphql-interfaces";

export const getAllWordsGql = gql`
  query getAllWords($userId: ID!) {
    getWords(getWordsArgs: { userId: $userId }) {
      totalCount
      edges {
        node {
          id
          originalWord
          translatedWord
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

export function useGetAllWordsQuery() {
  return useQuery<getAllWords>(getAllWordsGql);
}
