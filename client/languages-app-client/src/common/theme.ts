import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    button: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: "#04395E" },
    secondary: { main: "#d1494e" },
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: "none",
        fontSize: "16px",
      },
    },
  },
});
