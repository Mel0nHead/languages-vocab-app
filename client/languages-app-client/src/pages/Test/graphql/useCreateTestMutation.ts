import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  createTest,
  createTestVariables,
} from "../../../generated-graphql-interfaces";

export function useCreateTestMutation() {
  return useMutation<createTest, createTestVariables>(
    gql`
      mutation createTest($userId: ID!) {
        createTest(createTestInput: { userId: $userId }) {
          id
        }
      }
    `
  );
}
