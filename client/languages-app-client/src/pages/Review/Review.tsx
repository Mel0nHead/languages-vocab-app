import React from "react";
import { useGetAllWordsQuery } from "./graphql/useGetAllWordsQuery";
import { useDeleteWordMutation } from "./graphql/useDeleteWordMutation";
import { TranslateCard } from "../../common/components/TranslateCard";
import { useSnackbar } from "notistack";

export function Review() {
  const { data, error, loading } = useGetAllWordsQuery(
    localStorage.getItem("userId") || ""
  );
  const [deleteWord] = useDeleteWordMutation();
  const { enqueueSnackbar } = useSnackbar();

  async function handleDelete(id: string) {
    try {
      await deleteWord({ variables: { id } });
      enqueueSnackbar("Word successfully deleted.", { variant: "success" });
    } catch (e) {
      enqueueSnackbar(
        "Something went wrong. Please refresh the page and try again.",
        { variant: "error" }
      );
    }
  }

  if (loading) {
    return <b data-testid="loading-message">Loading...</b>;
  }

  if (error) {
    return <b data-testid="error-message">{error}</b>;
  }

  if (!data) {
    return (
      <b>
        You have no words to review. Please add some words on the Home page
        first.
      </b>
    );
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
