import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { login, loginVariables } from "../../../generated-graphql-interfaces";

export function useLoginQuery() {
  return useQuery<login, loginVariables>(
    gql`
      query login($email: String!, $password: String!) {
        login(password: $password, email: $email) {
          id
          email
        }
      }
    `
  );
}
