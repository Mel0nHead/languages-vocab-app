import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(2),
  },
}));

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
  const classes = useStyles();
  const options = Object.entries(props.availableLanguages);
  const [value, setValue] = useState<[string, string] | null>(null);

  return (
    <>
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} label={props.label} variant="outlined" />
        )}
        options={options}
        getOptionLabel={(option) => option[1]}
        value={value}
        onChange={(_: any, newValue: [string, string] | null) => {
          setValue(newValue);
        }}
        getOptionSelected={(option, value) => {
          return option[0] === value[0] && option[1] === value[1];
        }}
      />
      <FormControl variant="outlined" className={classes.formControl}>
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
