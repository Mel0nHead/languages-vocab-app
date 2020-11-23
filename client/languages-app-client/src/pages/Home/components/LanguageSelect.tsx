import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ChosenLanguage } from "../../../common/interfaces";

interface LanguageSelectProps {
  label: string;
  value: ChosenLanguage;
  handleChange: (_: any, newValue: ChosenLanguage) => void;
  availableLanguages: {
    [key: string]: string;
  };
}

export function LanguageSelect(props: LanguageSelectProps) {
  const options = Object.entries(props.availableLanguages);

  return (
    <Autocomplete
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined" />
      )}
      options={options}
      getOptionLabel={(option) => option[1]}
      value={props.value}
      onChange={props.handleChange}
      getOptionSelected={(option, value) => {
        return option[0] === value[0] && option[1] === value[1];
      }}
    />
  );
}
