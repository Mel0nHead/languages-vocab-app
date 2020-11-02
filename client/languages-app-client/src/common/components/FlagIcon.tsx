import React from "react";
import ReactCountryFlag from "react-country-flag";
import { LanguageInfo } from "../constants";

interface FlagIconProps {
  languageInfo: LanguageInfo | undefined;
}

export function FlagIcon(props: FlagIconProps) {
  return (
    <span
      title={props.languageInfo?.language || "English"}
      data-testid="flag-icon-container"
    >
      <ReactCountryFlag
        style={{
          fontSize: "2rem",
          marginRight: "5px",
          borderRadius: "3px",
        }}
        countryCode={props.languageInfo?.countryCode || "GB"}
        svg
      />
    </span>
  );
}
