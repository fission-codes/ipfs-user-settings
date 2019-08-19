import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import LoadIcon from "@material-ui/icons/Unarchive";
import SaveIcon from "@material-ui/icons/Save";
import SubmitButton from "./SubmitButton";

class PreferenceForm extends React.Component {
  handleCIDChange = evt => {
    this.props.onCIDChange(evt.target.value);
  };

  handlePrefChange = name => evt => {
    const value = evt.target.value;
    this.props.onPrefChange(name, value);
  };

  render() {
    const { preferences, justSaved, justLoaded, classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h5" className={classes.header}>
          Settings
        </Typography>
        <form onSubmit={this.props.onLoad}>
          <TextField
            label="cid"
            value={this.props.cid}
            onChange={this.handleCIDChange}
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
            onChange={this.handlePrefChange("one")}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="two"
            value={preferences.two}
            onChange={this.handlePrefChange("two")}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="three"
            value={preferences.three}
            onChange={this.handlePrefChange("three")}
            fullWidth
            className={classes.input}
          />
          <InputLabel shrink>Code Style</InputLabel>
          <Select
            value={preferences.codeStyle}
            onChange={this.handlePrefChange("codeStyle")}
            fullWidth
            className={classes.input}
          >
            {styleOptions.map(style => (
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

const styleOptions = [
  "arduinoLight",
  "codepenEmbed",
  "darcula",
  "docco",
  "github",
  "googlecode",
  "hybrid",
  "monokaiSublime",
  "nord",
  "ocean",
  "pojoaque",
  "tomorrow",
  "tomorrowNight",
  "vs"
];

const styles = theme =>
  createStyles({
    root: {
      width: "100%"
    },
    header: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(2)
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
