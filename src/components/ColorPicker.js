import React from "react";
import PropTypes from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { SwatchesPicker } from "react-color";

class SubmitButton extends React.Component {
  state = { anchorEl: null };

  openPicker = evt => {
    evt.preventDefault();
    this.setState({ anchorEl: evt.currentTarget });
  };

  closePicker = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = evt => {
    const value = {
      target: {
        value: evt.hex
      }
    };
    this.closePicker();
    this.props.onChange(value);
  };

  render() {
    const { value, classes } = this.props;
    return (
      <React.Fragment>
        <Button onClick={this.openPicker}>
          {value}
          <div className={classes.preview} style={{ backgroundColor: value }} />
        </Button>
        <Popover
          open={!!this.state.anchorEl}
          anchorEl={this.state.anchorEl}
          onClose={this.closePicker}
        >
          <SwatchesPicker onChangeComplete={this.handleChange} />
        </Popover>
      </React.Fragment>
    );
  }
}

SubmitButton.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string)
};

const styles = theme =>
  createStyles({
    button: {
      "& svg": {
        fontSize: 20,
        marginLeft: theme.spacing(1)
      }
    },
    preview: {
      marginLeft: theme.spacing(1),
      width: theme.spacing(2),
      height: theme.spacing(2)
    }
  });

export default withStyles(styles)(SubmitButton);
