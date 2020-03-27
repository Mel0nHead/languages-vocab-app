import React, { useState } from "react";

const yandexApiKey =
  "trnsl.1.1.20200214T093209Z.770ffb3919b46232.ec06ae1560b2b3f7f06a7ee0cb97b88cc777790f";

export function Home() {
  const [inputValue, setInputValue] = useState("");
  const [languages, setLanguages] = useState([]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleTranslate() {}

  return (
    <div>
      <h1>Home</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div>
        <span>Select language to translate to:</span>
      </div>
      <div>
        <button onClick={handleTranslate}>Translate</button>
      </div>
      <div></div>
    </div>
  );
}
