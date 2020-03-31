import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export function useGetWordsToReviewQuery(boxes: number[]) {
  return useQuery(
    gql`
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
    `,
    { variables: { boxes } }
  );
}
