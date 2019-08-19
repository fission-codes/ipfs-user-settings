import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PreferenceForm from "./PreferenceForm";
import Preview from "./Preview";
import ErrorSnackbar from "./ErrorSnackbar";
import { loadPreferences, savePreferences } from "../ipfs/preferences";

const DEFAULT_CID = "QmYiGo3KpK5Ca928ujpH2MKJgVEkLE981gj1QERYC5h8e8";
class Main extends React.Component {
  state = {
    cid: "",
    preferences: {
      one: "",
      two: "",
      three: "",
      codeStyle: "docco"
    },
    justSaved: false,
    justLoaded: false,
    error: null
  };

  async componentDidMount() {
    const cid = localStorage.getItem("preferenceCID") || DEFAULT_CID;
    await this.loadPreferences(cid);
  }

  handleCIDChange = value => {
    this.setState({
      ...this.state,
      cid: value,
      justLoaded: false
    });
  };

  handlePrefChange = (name, value) => {
    this.setState(state => ({
      ...state,
      preferences: {
        ...state.preferences,
        [name]: value
      },
      justSaved: false
    }));
  };

  loadPreferences = async cid => {
    let preferences;
    try {
      preferences = await loadPreferences(cid);
    } catch (error) {
      this.setState({ error });
      return;
    }
    this.setState({
      cid,
      preferences,
      justLoaded: true
    });
  };

  handleLoad = async evt => {
    evt.preventDefault();
    const { cid } = this.state;
    this.loadPreferences(cid);
  };

  handleSave = async evt => {
    evt.preventDefault();
    const { preferences } = this.state;
    if (preferences) {
      let cid;
      try {
        cid = await savePreferences(preferences);
      } catch (error) {
        this.setState({ error });
        return;
      }
      localStorage.setItem("preferenceCID", cid);
      this.setState({
        cid,
        justSaved: true
      });
    }
  };

  handleErrorClose = evt => {
    if (evt) {
      evt.preventDefault();
    }
    this.setState({ error: null });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.container}>
        <Typography variant="h4" gutterBottom>
          IPFS Portable User Settings
        </Typography>
        {/* <div className={classes.main}> */}
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <Paper className={classes.paper}>
              <PreferenceForm
                cid={this.state.cid}
                preferences={this.state.preferences}
                justSaved={this.state.justSaved}
                justLoaded={this.state.justLoaded}
                onCIDChange={this.handleCIDChange}
                onPrefChange={this.handlePrefChange}
                onLoad={this.handleLoad}
                onSave={this.handleSave}
              />
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper className={classes.paper}>
              <Preview
                cid={this.state.cid}
                preferences={this.state.preferences}
              />
            </Paper>
          </Grid>
        </Grid>
        {/* </div> */}
        <ErrorSnackbar
          error={this.state.error}
          onClose={this.handleErrorClose}
        />
      </Container>
    );
  }
}

const styles = theme =>
  createStyles({
    container: {
      marginTop: 64
    },
    main: {
      display: "flex"
    },
    paper: {
      padding: 32
    }
  });

export default withStyles(styles)(Main);
