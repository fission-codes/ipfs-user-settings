import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";

const SubmitButton = props => {
  if (!props.submitted) {
    return (
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className={props.classes.button}
      >
        {props.textNormal}
        {props.icon}
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className={props.classes.button}
        disabled
      >
        {props.textSubmitted}
        <CheckIcon className={props.classes.icon} />
      </Button>
    );
  }
};

const styles = theme =>
  createStyles({
    button: {
      "& svg": {
        fontSize: 20,
        marginLeft: 8
      }
    }
  });

export default withStyles(styles)(SubmitButton);
