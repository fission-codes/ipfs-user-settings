import React from "react";
import PropTypes from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import * as codeStyles from "react-syntax-highlighter/dist/esm/styles/hljs";
import codeSample from "../utils/codeSample";
import PrefPropType from "../utils/prefPropType";
SyntaxHighlighter.registerLanguage("javascript", js);

class Preview extends React.Component {
  render() {
    const { preferences = {}, classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.header}>
          Preview
        </Typography>
        <div>One: {preferences.username}</div>
        <SyntaxHighlighter
          language="javascript"
          style={codeStyles[preferences.codeStyle]}
        >
          {codeSample}
        </SyntaxHighlighter>
      </div>
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
    header: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(2)
    }
  });

export default withStyles(styles)(Preview);
