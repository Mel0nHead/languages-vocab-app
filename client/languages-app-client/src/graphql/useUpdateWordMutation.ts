import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  updateWord,
  updateWordVariables,
} from "../generated-graphql-interfaces";

export function useUpdateWordMutation(variables: { id: string }) {
  return useMutation<updateWord, updateWordVariables>(
    gql`
      mutation updateWord($id: ID!) {
        updateWord(wordId: $id) {
          id
          language
        }
      }
    `,
    { variables, refetchQueries: ["getAllWords", "getWords"] }
  );
}
