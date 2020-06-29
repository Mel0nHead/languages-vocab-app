import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export const deleteWordGql = gql`
  mutation deleteWord($id: Int!) {
    deleteWord(id: $id)
  }
`;

export function useDeleteWordMutation() {
  return useMutation(deleteWordGql, { refetchQueries: ["getWordsToReview"] });
}
