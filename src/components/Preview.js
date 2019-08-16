import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";

class Preview extends React.Component {
  render() {
    const { preferences = {}, classes } = this.props;
    return (
      <div className={classes.preview}>
        <div>One: {preferences.one}</div>
        <div>Two: {preferences.two}</div>
        <div>Three: {preferences.three}</div>
      </div>
    );
  }
}

const styles = theme =>
  createStyles({
    preview: {
      width: "100%"
    }
  });

export default withStyles(styles)(Preview);
