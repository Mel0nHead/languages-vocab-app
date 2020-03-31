import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export function useDeleteWordMutation() {
  return useMutation(
    gql`
      mutation deleteWord($id: Int!) {
        deleteWord(id: $id)
      }
    `,
    { refetchQueries: ["getWordsToReview"] }
  );
}
