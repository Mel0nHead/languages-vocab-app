import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  createWord,
  createWordVariables,
} from "../generated-graphql-interfaces";

export const addWordGql = gql`
  mutation createWord(
    $language: String!
    $originalWord: String!
    $translatedWord: String!
    $userId: ID!
  ) {
    createWord(
      newWordInput: {
        language: $language
        originalWord: $originalWord
        translatedWord: $translatedWord
        userId: $userId
      }
    ) {
      id
      originalWord
      translatedWord
      language
      dateAdded
      dateLastSeen
    }
  }
`;

export function useAddWordMutation() {
  return useMutation<createWord, createWordVariables>(addWordGql, {
    refetchQueries: ["getWordsToReview"],
  });
}
