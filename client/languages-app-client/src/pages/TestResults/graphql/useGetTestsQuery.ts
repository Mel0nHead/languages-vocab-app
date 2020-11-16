import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  getTests,
  getTestsVariables,
} from "../../../generated-graphql-interfaces";

export function useGetTestsQuery(userId: string) {
  return useQuery<getTests, getTestsVariables>(
    gql`
      query getTests($userId: ID!) {
        getTests(userId: $userId) {
          id
          finishedAt
          correctAnswers
          incorrectAnswers
        }
      }
    `,
    { variables: { userId } }
  );
}
