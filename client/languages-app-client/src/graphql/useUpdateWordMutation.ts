import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  updateWord,
  updateWordVariables,
} from "../generated-graphql-interfaces";

export function useUpdateWordMutation(variables: { id: number }) {
  return useMutation<updateWord, updateWordVariables>(
    gql`
      mutation updateWord($id: Int!) {
        updateWord(wordId: $id) {
          id
          language
        }
      }
    `,
    { variables, refetchQueries: ["getWordsToReview"] }
  );
}
