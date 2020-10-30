import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { login, loginVariables } from "../../../generated-graphql-interfaces";

export function useLoginMutation() {
  return useMutation<login, loginVariables>(
    gql`
      mutation login($email: String!, $password: String!) {
        login(password: $password, email: $email) {
          userId
          token
        }
      }
    `
  );
}
