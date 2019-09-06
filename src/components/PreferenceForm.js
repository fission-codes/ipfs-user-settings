import React from "react";
import PropTypes from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import LoadIcon from "@material-ui/icons/Unarchive";
import SaveIcon from "@material-ui/icons/Save";
import ColorPicker from "./ColorPicker";
import SubmitButton from "./SubmitButton";
import styleOptions from "../utils/styleOptions";
import PrefPropType from "../utils/prefPropType";

class PreferenceForm extends React.Component {
  handleCIDChange = evt => {
    this.props.onCIDChange(evt.target.value);
  };

  handlePrefChange = name => evt => {
    const value = evt.target.value;
    this.props.onPrefChange(name, value);
  };

  render() {
    const { preferences, justSaved, saving, justLoaded, classes } = this.props;

    return (
      <Paper className={classes.root}>
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
            label="Username"
            value={preferences.username}
            onChange={this.handlePrefChange("username")}
            fullWidth
            className={classes.input}
          />
          <InputLabel shrink>Primary Color</InputLabel>
          <ColorPicker
            value={preferences.primaryColor}
            onChange={this.handlePrefChange("primaryColor")}
          />
          <InputLabel shrink>Secondary Color</InputLabel>
          <ColorPicker
            value={preferences.secondaryColor}
            onChange={this.handlePrefChange("secondaryColor")}
          />
          <InputLabel shrink>Theme</InputLabel>
          <Select
            value={preferences.theme}
            onChange={this.handlePrefChange("theme")}
            fullWidth
            className={classes.input}
          >
            <MenuItem key="light" value="light">
              light
            </MenuItem>
            <MenuItem key="dark" value="dark">
              dark
            </MenuItem>
          </Select>
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
            textActive="Saving..."
            icon={<SaveIcon />}
            submitted={justSaved}
            active={saving}
          />
        </form>
      </Paper>
    );
  }
}

PreferenceForm.propTypes = {
  cid: PropTypes.string.isRequired,
  preferences: PrefPropType.isRequired,
  justSaved: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  justLoaded: PropTypes.bool.isRequired,
  onCIDChange: PropTypes.func.isRequired,
  onPrefChange: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string)
};

const styles = theme =>
  createStyles({
    root: {
      padding: theme.spacing(4),
      width: "100%"
    },
    header: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    divider: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
    input: {
      marginBottom: theme.spacing(2),
      width: "100%",
      display: "block"
    }
  });

export default withStyles(styles)(PreferenceForm);
