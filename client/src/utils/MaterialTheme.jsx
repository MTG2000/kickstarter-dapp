import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#009688"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#1de9b6"
      // dark: will be calculated from palette.secondary.main,
    }

    // error: will use the default color
  }
});

const MaterialTheme = props => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default MaterialTheme;
