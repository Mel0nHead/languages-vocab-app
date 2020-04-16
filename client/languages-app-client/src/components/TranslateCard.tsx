import React from "react";
import { Word } from "../pages/Home";

interface TranslateCardProps {
  word: Word;
  handleAdd: (word: Word) => void;
}

export function TranslateCard(props: TranslateCardProps) {
  const { word, handleAdd } = props;
  return (
    <div style={{ border: "1px solid red", marginBottom: "20px" }}>
      <span>{`${word.originalWord} - ${word.translatedWord}`}</span>
      <br />
      <span>{word.language}</span>
      <div>
        <button onClick={() => handleAdd(word)}>Add to my words</button>
      </div>
    </div>
  );
}
