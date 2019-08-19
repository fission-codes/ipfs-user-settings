import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./components/Main";

const theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: "#6446fa"
    },
    secondary: {
      main: "#ff5274"
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </MuiThemeProvider>
  );
}

export default App;
