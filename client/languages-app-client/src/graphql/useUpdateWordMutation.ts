import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export function useUpdateWordMutation(variables: {
  id: number;
  dateLastSeen: Date; // might be number
  box: number;
}) {
  return useMutation(
    gql`
      mutation updateWord($id: Int!, $dateLastSeen: Date!, $box: Int!) {
        updateWord(id: $id, dateLastSeen: $dateLastSeen, box: $box)
      }
    `,
    { variables, refetchQueries: ["getWordsToReview"] }
  );
}
