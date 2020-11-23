import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ChosenLanguage, LanguageOption } from "../../../common/interfaces";

interface LanguageSelectProps {
  label: string;
  value: ChosenLanguage;
  handleChange: (_: any, newValue: ChosenLanguage) => void;
  availableLanguages: {
    [key: string]: string;
  };
}

export function LanguageSelect(props: LanguageSelectProps) {
  const options: LanguageOption[] = Object.entries(
    props.availableLanguages
  ).map((language) => {
    return { code: language[0], name: language[1] };
  });

  return (
    <Autocomplete
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined" />
      )}
      options={options}
      getOptionLabel={(option) => option.name}
      value={props.value}
      onChange={props.handleChange}
      getOptionSelected={(option, value) => {
        return option.code === value.code && option.name === value.name;
      }}
    />
  );
}
