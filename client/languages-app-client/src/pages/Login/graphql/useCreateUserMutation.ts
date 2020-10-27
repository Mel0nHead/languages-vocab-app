import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  createUser,
  createUserVariables,
} from "../../../generated-graphql-interfaces";

export function useCreateUserMutation() {
  return useMutation<createUser, createUserVariables>(
    gql`
      mutation createUser($email: String!, $password: String!, $name: String!) {
        createUser(
          createUserInput: { email: $email, password: $password, name: $name }
        ) {
          id
        }
      }
    `
  );
}
