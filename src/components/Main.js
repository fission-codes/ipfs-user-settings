import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import PreferenceForm from "./PreferenceForm";
import Preview from "./Preview";
import getIpfs from "../ipfs/getIpfs";

const DEFAULT_CID = "QmYiGo3KpK5Ca928ujpH2MKJgVEkLE981gj1QERYC5h8e8";

class Main extends React.Component {
  state = {
    cid: "",
    preferences: {}
  };

  async componentDidMount() {
    const cid = localStorage.getItem("preferenceCID") || DEFAULT_CID;
    const ipfs = await getIpfs();
    const resp = await ipfs.get(cid);
    const preferences = JSON.parse(resp[0].content.toString());
    this.setState({ cid, preferences });
  }

  savePreferences = async preferences => {
    if (preferences) {
      const ipfs = await getIpfs();
      const toAdd = Buffer.from(JSON.stringify(preferences));
      const resp = await ipfs.add(toAdd);
      const cid = resp[0].hash;
      console.log(cid);
      localStorage.setItem("preferenceCID", cid);
      this.setState({ cid, preferences });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.container}>
        <Typography variant="h4" gutterBottom>
          IPFS Portable User Settings
        </Typography>
        <div className={classes.main}>
          <PreferenceForm
            cid={this.state.cid}
            preferences={this.state.preferences}
            savePreferences={this.savePreferences}
          />
          <Preview cid={this.state.cid} preferences={this.state.preferences} />
        </div>
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
    }
  });

export default withStyles(styles)(Main);
