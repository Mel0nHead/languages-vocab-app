import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export function useDeleteWordMutation(variables: { id: number }) {
  return useMutation(
    gql`
      mutation {
        deleteWord(id: $id)
      }
    `,
    { variables }
  );
}
