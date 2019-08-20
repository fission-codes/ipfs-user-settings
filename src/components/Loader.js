import React from "react";
import PropTypes from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = props => {
  const { loaded, classes } = props;
  if (loaded) {
    return props.children;
  }
  return (
    <div className={classes.root}>
      <CircularProgress size={100} />
    </div>
  );
};

Loader.propTypes = {
  loaded: PropTypes.bool,
  children: PropTypes.element,
  classes: PropTypes.objectOf(PropTypes.string)
};

const styles = theme =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: theme.spacing(8)
    }
  });

export default withStyles(styles)(Loader);
