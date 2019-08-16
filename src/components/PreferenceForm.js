import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class PreferenceForm extends React.Component {
  constructor(props) {
    super(props);
    const { cid, preferences = {} } = this.props;
    const { one = "", two = "", three = "" } = preferences;
    this.state = { cid, one, two, three };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { cid, preferences = {} } = this.props;
      const { one = "", two = "", three = "" } = preferences;
      this.setState({ cid, one, two, three });
    }
  }

  handleChange = name => evt => {
    this.setState({
      [name]: evt.target.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { one, two, three } = this.state;
    this.props.savePreferences({ one, two, three });
  };

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className={classes.form}>
        <TextField
          label="cid"
          value={this.props.cid}
          // onChange={this.handleChange("cid")}
          disabled
          className={classes.textField}
        />
        <TextField
          label="one"
          value={this.state.one}
          onChange={this.handleChange("one")}
          className={classes.textField}
        />
        <TextField
          label="two"
          value={this.state.two}
          onChange={this.handleChange("two")}
          className={classes.textField}
        />
        <TextField
          label="three"
          value={this.state.three}
          onChange={this.handleChange("three")}
          className={classes.textField}
        />
        <Button variant="contained" color="secondary" type="submit">
          Save
        </Button>
      </form>
    );
  }
}

const styles = theme =>
  createStyles({
    form: {
      width: "100%"
    },
    textField: {
      marginBottom: 16,
      width: "100%",
      // maxWidth: 320,
      display: "block"
    }
  });

export default withStyles(styles)(PreferenceForm);
