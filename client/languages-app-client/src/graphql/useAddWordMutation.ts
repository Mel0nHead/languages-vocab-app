import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export function useAddWordMutation(variables: {
  language: string;
  originalWord: string;
  translatedWord: string;
  dateAdded: Date; // might be number
  dateLastSeen: Date; // might be number
  box: number;
}) {
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
    { variables }
  );
}
