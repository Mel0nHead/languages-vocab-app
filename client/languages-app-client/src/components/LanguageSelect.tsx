import React from "react";

interface LanguageSelectProps {
  label: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  availableLanguages: {
    [key: string]: string;
  };
}

export function LanguageSelect(props: LanguageSelectProps) {
  return (
    <>
      <span>{props.label}</span>
      <select value={props.value} onChange={props.handleChange}>
        {Object.entries(props.availableLanguages).map((language) => {
          return (
            // e.g. lna
            <option key={language[0]} value={language[0]}>
              {`${language[1]}`}
            </option>
          );
        })}
      </select>
    </>
  );
}
