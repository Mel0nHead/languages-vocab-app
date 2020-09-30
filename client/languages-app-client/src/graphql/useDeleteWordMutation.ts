import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  deleteWord,
  deleteWordVariables,
} from "../generated-graphql-interfaces";

export const deleteWordGql = gql`
  mutation deleteWord($id: ID!) {
    deleteWord(wordId: $id)
  }
`;

export function useDeleteWordMutation() {
  return useMutation<deleteWord, deleteWordVariables>(deleteWordGql, {
    refetchQueries: ["getWordsToReview"],
  });
}
