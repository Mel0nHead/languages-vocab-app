import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";

interface LanguageSelectProps {
  label: string;
  value: string;
  handleChange: (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  availableLanguages: {
    [key: string]: string;
  };
}

export function LanguageSelect(props: LanguageSelectProps) {
  return (
    <>
      <FormControl variant="outlined">
        <InputLabel htmlFor="from-language" data-testid="select-label">
          {props.label}
        </InputLabel>
        <Select
          native={true}
          value={props.value}
          onChange={props.handleChange}
          label="From"
          inputProps={{
            name: "from",
            id: "from-language",
          }}
          data-testid="select"
        >
          {Object.entries(props.availableLanguages).map((language) => {
            return (
              <option key={language[0]} value={language[0]}>
                {`${language[1]}`}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}
