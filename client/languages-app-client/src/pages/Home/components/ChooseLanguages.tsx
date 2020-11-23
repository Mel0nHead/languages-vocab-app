import React from "react";
import { LanguageSelect } from "./LanguageSelect";
import { useFetch } from "../../../common/hooks/useFetch";
import { YANDEX_KEY, YANDEX_URL } from "../../../common/constants";
import { Skeleton } from "@material-ui/lab";
import { Fade } from "@material-ui/core";
import { CurrentLanguage, ChosenLanguage } from "../../../common/interfaces";

interface SupportedLanguages {
  dirs: string[];
  langs: {
    [code: string]: string;
  };
}

interface ChooseLanguagesProps {
  currentLanguage: CurrentLanguage;
  handleLanguageChange(
    key: "source" | "destination"
  ): (_: any, newValue: ChosenLanguage) => void;
}

export function ChooseLanguages(props: ChooseLanguagesProps) {
  const { data, loading, error } = useFetch<SupportedLanguages>(
    `${YANDEX_URL}/getLangs?key=${YANDEX_KEY}&ui=en`,
    {
      method: "POST",
    }
  );

  const isReady = !loading && !!data;

  if (!!error)
    return (
      <b data-testid="choose-languages-error">
        An error occurred trying to load the supported languages.
      </b>
    );

  return (
    <div data-testid="choose-languages">
      {isReady ? (
        <Fade in={isReady} timeout={500}>
          <div>
            <LanguageSelect
              label="From:"
              value={props.currentLanguage.source}
              handleChange={props.handleLanguageChange("source")}
              availableLanguages={data!.langs}
            />
            <LanguageSelect
              label="To:"
              value={props.currentLanguage.destination}
              handleChange={props.handleLanguageChange("destination")}
              availableLanguages={data!.langs}
            />
          </div>
        </Fade>
      ) : (
        <Fade in={!isReady} timeout={500}>
          <div>
            <Skeleton height={56} variant="rect" width={326} />
          </div>
        </Fade>
      )}
    </div>
  );
}
