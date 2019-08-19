import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./components/Main";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6446fa",
      light: "#9e74ff",
      dark: "#1118c6"
    },
    secondary: {
      main: "#ff5274",
      light: "#ff87a2",
      dark: "#1118c6"
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
