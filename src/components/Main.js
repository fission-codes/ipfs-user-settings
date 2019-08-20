import React from "react";
import PropTypes from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PreferenceForm from "./PreferenceForm";
import Preview from "./Preview";
import ErrorSnackbar from "./ErrorSnackbar";
import Loader from "./Loader";
import getIpfs from "../ipfs/getIpfs";
import { loadPreferences, savePreferences } from "../ipfs/preferences";

const DEFAULT_CID = "QmYiGo3KpK5Ca928ujpH2MKJgVEkLE981gj1QERYC5h8e8";
class Main extends React.Component {
  state = {
    ipfsLoaded: false,
    cid: "",
    preferences: {
      username: "",
      primaryColor: "#6446fa",
      secondaryColor: "#ff5274",
      theme: "light",
      font: "Roboto",
      codeStyle: "darcula"
    },
    justSaved: false,
    justLoaded: false,
    error: null
  };

  async componentDidMount() {
    try {
      await getIpfs();
    } catch (err) {
      this.setState({ error: err.toString() });
    }
    const cid = localStorage.getItem("preferenceCID") || DEFAULT_CID;
    await this.loadPreferences(cid);
    this.setState({ ipfsLoaded: true });
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
      this.setState({ error: error.toString() });
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
        this.setState({ error: error.toString() });
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
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
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
          </Grid>
          <Grid item sm={12} md={6}>
            <Loader loaded={this.state.ipfsLoaded}>
              <Preview
                cid={this.state.cid}
                preferences={this.state.preferences}
              />
            </Loader>
          </Grid>
        </Grid>
        <ErrorSnackbar
          error={this.state.error}
          onClose={this.handleErrorClose}
        />
      </Container>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

const styles = theme =>
  createStyles({
    container: {
      marginTop: theme.spacing(8)
    },
    main: {
      display: "flex"
    }
  });

export default withStyles(styles)(Main);
