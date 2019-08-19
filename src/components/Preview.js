import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import * as codeStyles from "react-syntax-highlighter/dist/esm/styles/hljs";
SyntaxHighlighter.registerLanguage("javascript", js);

class Preview extends React.Component {
  render() {
    const { preferences = {}, classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.header}>
          Preview
        </Typography>
        <div>One: {preferences.one}</div>
        <div>Two: {preferences.two}</div>
        <div>Three: {preferences.three}</div>
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

const codeSample = `
export const ipfsIsWorking = async ipfs => {
  try {
    const id = await ipfs.id();
    if (id.id !== undefined && id.agentVersion !== undefined) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
`;

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
