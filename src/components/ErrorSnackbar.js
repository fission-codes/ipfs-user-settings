import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";

const ErrorSnackbar = props => {
  const { classes } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={!!props.error}
      onClose={props.onClose}
      autoHideDuration={5000}
      className={classes.snackbar}
    >
      {props.error && (
        <SnackbarContent
          className={classes.content}
          message={
            <span className={classes.message}>
              <ErrorIcon className={classes.errorIcon} />
              {props.error.toString()}
            </span>
          }
          action={[
            <IconButton key="close" color="inherit" onClick={props.onClose}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          ]}
        />
      )}
    </Snackbar>
  );
};

const styles = theme =>
  createStyles({
    snackbar: {
      backgroundColor: theme.palette.error.dark
    },
    content: {
      backgroundColor: "inherit"
    },
    message: {
      display: "flex",
      alignItems: "center"
    },
    errorIcon: {
      fontSize: 20,
      marginRight: 8
    },
    closeIcon: {
      fontSize: 20
    }
  });

export default withStyles(styles)(ErrorSnackbar);
