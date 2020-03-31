import React from "react";
import { useGetWordsToReviewQuery } from "../graphql/useGetWordsToReviewQuery";
import { Word } from "./Home";
import { useDeleteWordMutation } from "../graphql/useDeleteWordMutation";

interface ExtendedWord extends Word {
  dateAdded: number;
  dateLastSeen: number;
  box: number;
}

export function Review() {
  const { data, error, loading } = useGetWordsToReviewQuery([1]);
  const [deleteWord] = useDeleteWordMutation();

  function handleDelete(id: number) {
    deleteWord({ variables: { id } });
  }

  if (loading) {
    return <b>Loading...</b>;
  }

  if (error) {
    return <b>An error occurred</b>;
  }

  return (
    <div>
      <h1>Review</h1>
      {data.getWordsToReview.map((word: ExtendedWord) => {
        return (
          <div
            key={word.id}
            style={{ border: "1px solid red", marginBottom: "20px" }}
          >
            <span>{`${word.originalWord} - ${word.translatedWord}`}</span>
            <br />
            <span>{word.language}</span>
            <div>
              <button onClick={() => handleDelete(word.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
