import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./theme";

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);
