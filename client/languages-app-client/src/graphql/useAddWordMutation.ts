import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export function useAddWordMutation() {
  return useMutation(
    gql`
      mutation createWord(
        $language: String!
        $originalWord: String!
        $translatedWord: String!
        $dateAdded: Date!
        $dateLastSeen: Date!
        $box: Int!
      ) {
        addWord(
          language: $language
          originalWord: $originalWord
          translatedWord: $translatedWord
          dateAdded: $dateAdded
          dateLastSeen: $dateLastSeen
          box: $box
        )
      }
    `,
    { refetchQueries: ["getWordsToReview"] }
  );
}
