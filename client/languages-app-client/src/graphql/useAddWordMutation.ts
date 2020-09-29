import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// TODO: get the frontend working and start using the generated interfaces

export const addWordGql = gql`
  mutation createWord(
    $language: String!
    $originalWord: String!
    $translatedWord: String!
  ) {
    createWord(
      newWordInput: {
        language: $language
        originalWord: $originalWord
        translatedWord: $translatedWord
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
  return useMutation(addWordGql, { refetchQueries: ["getWordsToReview"] });
}
