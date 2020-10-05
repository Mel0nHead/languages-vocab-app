import React from "react";
import { LanguageSelect } from "./LanguageSelect";
import { useFetch } from "../hooks/useFetch";
import { YANDEX_KEY, YANDEX_URL } from "../constants";

interface SupportedLanguages {
  dirs: string[];
  langs: {
    [code: string]: string;
  };
}

interface ChooseLanguagesProps {
  currentLanguage: {
    destination: string;
    source: string;
  };
  handleLanguageChange(
    key: "source" | "destination"
  ): (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
}

export function ChooseLanguages(props: ChooseLanguagesProps) {
  const { data, loading, error } = useFetch<SupportedLanguages>(
    `${YANDEX_URL}/getLangs?key=${YANDEX_KEY}&ui=en`,
    {
      method: "POST",
    }
  );

  if (loading)
    return (
      <b data-testid="choose-languages-loading">
        Loading supported languages...
      </b>
    );

  if (!!error)
    return (
      <b data-testid="choose-languages-error">
        An error occurred trying to load the supported languages.
      </b>
    );

  if (!data)
    return (
      <b data-testid="choose-languages-no-data">
        No data was retrieved. Refresh the page and try again.
      </b>
    );

  return (
    <div data-testid="choose-languages">
      <LanguageSelect
        label="From:"
        value={props.currentLanguage.source}
        handleChange={props.handleLanguageChange("source")}
        availableLanguages={data.langs}
      />
      <LanguageSelect
        label="To:"
        value={props.currentLanguage.destination}
        handleChange={props.handleLanguageChange("destination")}
        availableLanguages={data.langs}
      />
    </div>
  );
}
