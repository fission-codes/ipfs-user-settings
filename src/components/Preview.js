import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  withStyles,
  createStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import * as codeStyles from "react-syntax-highlighter/dist/esm/styles/hljs";
import codeSample from "../utils/codeSample";
import PrefPropType from "../utils/prefPropType";
SyntaxHighlighter.registerLanguage("javascript", js);

class Preview extends React.Component {
  getTheme = preferences => {
    return createMuiTheme({
      palette: {
        primary: {
          main: preferences.primaryColor
        },
        secondary: {
          main: preferences.secondaryColor
        }
      }
    });
  };

  render() {
    const { preferences = {}, classes } = this.props;
    const theme = this.getTheme(preferences);
    const isDark = preferences.theme === "dark";

    return (
      <Paper
        className={classnames(
          classes.root,
          isDark ? classes.darkTheme : classes.lightTheme
        )}
      >
        <MuiThemeProvider theme={theme}>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h5">Preview</Typography>
            </Toolbar>
          </AppBar>
          <Container className={classes.container}>
            <Typography variant="h6">
              Welcome {preferences.username}!
            </Typography>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Primary
            </Button>
            <Button
              color="secondary"
              variant="contained"
              className={classes.button}
            >
              Secondary
            </Button>

            <SyntaxHighlighter
              language="javascript"
              style={codeStyles[preferences.codeStyle]}
            >
              {codeSample}
            </SyntaxHighlighter>
          </Container>
        </MuiThemeProvider>
      </Paper>
    );
  }
}

Preview.propTypes = {
  preferences: PrefPropType,
  classes: PropTypes.objectOf(PropTypes.string)
};

const styles = theme =>
  createStyles({
    root: {
      width: "100%"
    },
    lightTheme: {},
    darkTheme: {
      backgroundColor: "#424242",
      color: "#fff"
    },
    container: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
    button: {
      margin: theme.spacing(1)
    }
  });

export default withStyles(styles)(Preview);
