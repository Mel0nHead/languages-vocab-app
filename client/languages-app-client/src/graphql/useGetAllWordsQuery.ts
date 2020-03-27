import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export function useGetAllWordsQuery() {
  return useQuery(
    gql`
      query {
        getAllWords {
          id
          originalWord
          translatedWord
          language
          dateAdded
          dateLastSeen
          box
        }
      }
    `
  );
}
