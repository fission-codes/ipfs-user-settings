import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";

const SubmitButton = props => {
  const { submitted, textNormal, textSubmitted } = props;
  const text = submitted ? textSubmitted : textNormal;
  const icon = submitted ? <CheckIcon /> : props.icon;

  return (
    <Button
      variant="contained"
      color="secondary"
      type="submit"
      disabled={submitted}
      className={props.classes.button}
    >
      {text}
      {icon}
    </Button>
  );
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