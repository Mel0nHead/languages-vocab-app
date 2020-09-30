import React from "react";
import { useGetAllWordsQuery } from "../graphql/useGetAllWordsQuery";
import { useDeleteWordMutation } from "../graphql/useDeleteWordMutation";
import { TranslateCard } from "../components/TranslateCard";

export function Review() {
  const { data, error, loading } = useGetAllWordsQuery();
  const [deleteWord] = useDeleteWordMutation();

  function handleDelete(id: string) {
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
      {data.getWords.edges.map((word) => {
        return (
          <TranslateCard
            word={word.node}
            onClick={() => handleDelete(word.node.id)}
            key={word.node.id}
            buttonLabel="Delete from my words"
          />
        );
      })}
    </div>
  );
}
