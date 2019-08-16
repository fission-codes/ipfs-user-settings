import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import LoadIcon from "@material-ui/icons/Unarchive";
import SaveIcon from "@material-ui/icons/Save";
import * as codeStyles from "react-syntax-highlighter/dist/esm/styles/hljs";
import SubmitButton from "./SubmitButton";

class PreferenceForm extends React.Component {
  handleChange = name => evt => {
    const value = evt.target.value;
    this.props.onChange(name, value);
  };

  render() {
    const { preferences, justSaved, justLoaded, classes } = this.props;

    return (
      <div className={classes.root}>
        <form onSubmit={this.props.onLoad}>
          <TextField
            label="cid"
            value={this.props.cid}
            onChange={this.handleChange("cid")}
            fullWidth
            className={classes.input}
          />
          <SubmitButton
            textNormal="Load"
            textSubmitted="Loaded"
            icon={<LoadIcon />}
            submitted={justLoaded}
          />
        </form>
        <Divider className={classes.divider} />
        <form onSubmit={this.props.onSave}>
          <TextField
            label="one"
            value={preferences.one}
            onChange={this.handleChange("one")}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="two"
            value={preferences.two}
            onChange={this.handleChange("two")}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="three"
            value={preferences.three}
            onChange={this.handleChange("three")}
            fullWidth
            className={classes.input}
          />
          <InputLabel shrink>Code Style</InputLabel>
          <Select
            value={preferences.codeStyle}
            onChange={this.handleChange("codeStyle")}
            fullWidth
            className={classes.input}
          >
            {Object.keys(codeStyles).map(style => (
              <MenuItem key={style} value={style}>
                {style}
              </MenuItem>
            ))}
          </Select>
          <SubmitButton
            textNormal="Save"
            textSubmitted="Saved"
            icon={<SaveIcon />}
            submitted={justSaved}
          />
        </form>
      </div>
    );
  }
}

const styles = theme =>
  createStyles({
    root: {
      width: "100%",
      marginRight: 64
    },
    divider: {
      marginTop: 32,
      marginBottom: 32
    },
    input: {
      marginBottom: 16,
      width: "100%",
      display: "block"
    }
  });

export default withStyles(styles)(PreferenceForm);
