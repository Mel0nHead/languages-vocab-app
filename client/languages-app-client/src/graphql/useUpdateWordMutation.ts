import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export function useUpdateWordMutation(variables: { wordId: number }) {
  return useMutation(
    gql`
      mutation updateWord($id: Int!, $dateLastSeen: Date!, $box: Int!) {
        updateWord(wordId: $id) {
          id
          language
        }
      }
    `,
    { variables, refetchQueries: ["getWordsToReview"] }
  );
}
