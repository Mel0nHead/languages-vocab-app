import React from "react";
import { useGetWordsToReviewQuery } from "../graphql/useGetWordsToReviewQuery";
import { Word } from "./Home";
import { useDeleteWordMutation } from "../graphql/useDeleteWordMutation";
import { TranslateCard } from "../components/TranslateCard";

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
    return <b data-testid="loading-message">Loading...</b>;
  }

  if (error || !data) {
    return <b data-testid="error-message">An error occurred</b>;
  }

  return (
    <div data-testid="review-container">
      <h1>Review</h1>
      {data.getWordsToReview.map((word: ExtendedWord) => {
        return (
          <TranslateCard
            word={word}
            onClick={() => handleDelete(word.id)}
            key={word.id}
            buttonLabel="Delete from my words"
          />
        );
      })}
    </div>
  );
}
