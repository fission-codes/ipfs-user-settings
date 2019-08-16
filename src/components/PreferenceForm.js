import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import * as codeStyles from "react-syntax-highlighter/dist/esm/styles/hljs";

class PreferenceForm extends React.Component {
  handleChange = name => evt => {
    const value = evt.target.value;
    this.props.onChange(name, value);
  };

  render() {
    const { cid, preferences, classes } = this.props;

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
          <Button variant="contained" color="secondary" type="submit">
            Load
          </Button>
        </form>
        <Divider className={classes.divider} />
        <form onSubmit={this.props.onSave}>
          <TextField
            label="one"
            value={this.props.preferences.one}
            onChange={this.handleChange("one")}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="two"
            value={this.props.preferences.two}
            onChange={this.handleChange("two")}
            fullWidth
            className={classes.input}
          />
          <TextField
            label="three"
            value={this.props.preferences.three}
            onChange={this.handleChange("three")}
            fullWidth
            className={classes.input}
          />
          <InputLabel shrink>Code Style</InputLabel>
          <Select
            value={this.props.preferences.codeStyle}
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
          <Button variant="contained" color="secondary" type="submit">
            Save
          </Button>
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
