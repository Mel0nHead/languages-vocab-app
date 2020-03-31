import React, { useEffect } from "react";
import { useGetWordsToReviewQuery } from "../graphql/useGetWordsToReviewQuery";
import { Word } from "./Home";

interface ExtendedWord extends Word {
  dateAdded: number;
  dateLastSeen: number;
  box: number;
}

export function Review() {
  const { data, error, loading } = useGetWordsToReviewQuery([1]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
          <div key={word.id}>
            <span>{`${word.originalWord} - ${word.translatedWord}`}</span>
            <br />
            <span>{word.language}</span>
          </div>
        );
      })}
    </div>
  );
}
