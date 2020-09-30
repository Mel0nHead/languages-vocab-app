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
// TODO: add unit tests
export function ChooseLanguages(props: ChooseLanguagesProps) {
  const { data, loading, error } = useFetch<SupportedLanguages>(
    `${YANDEX_URL}/getLangs?key=${YANDEX_KEY}&ui=en`,
    {
      method: "POST",
    }
  );

  if (loading) return <b>Loading supported languages...</b>;

  if (error)
    return <b>An error occurred trying to load the supported languages.</b>;

  if (!data)
    return <b>No data was retrieved. Refresh the page and try again.</b>;

  return (
    <div>
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
