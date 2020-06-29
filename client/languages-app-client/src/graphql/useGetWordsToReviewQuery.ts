import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const getWordsToReviewGql = gql`
  query getWordsToReview($boxes: [Int!]!) {
    getWordsToReview(boxes: $boxes) {
      id
      originalWord
      translatedWord
      language
      dateAdded
      dateLastSeen
      box
    }
  }
`;

export function useGetWordsToReviewQuery(boxes: number[]) {
  return useQuery(getWordsToReviewGql, { variables: { boxes } });
}
