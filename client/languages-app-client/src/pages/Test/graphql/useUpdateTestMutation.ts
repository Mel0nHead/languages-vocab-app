import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  updateTest,
  updateTestVariables,
} from "../../../generated-graphql-interfaces";

export function useUpdateTestMutation() {
  return useMutation<updateTest, updateTestVariables>(gql`
    mutation updateTest(
      $testId: ID!
      $isAnswerCorrect: Boolean!
      $completed: Boolean!
    ) {
      updateTest(
        testId: $testId
        isAnswerCorrect: $isAnswerCorrect
        completed: $completed
      ) {
        id
      }
    }
  `);
}
