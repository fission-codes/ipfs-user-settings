import getIpfsWithConfig from "get-ipfs";
import { pin } from "@fission-suite/client";

const ipfsProvider =
  process.env.REACT_APP_INTERPLANETARY_FISSION_URL || "https://hostless.dev";
const username = process.env.REACT_APP_INTERPLANETARY_FISSION_USERNAME;
const password = process.env.REACT_APP_INTERPLANETARY_FISSION_PASSWORD;
const bootstrapNodeWSS =
  process.env.REACT_APP_BOOTSTRAP_NODE_WSS ||
  "/dns4/ipfs.runfission.com/tcp/4003/wss/ipfs/QmVLEz2SxoNiFnuyLpbXsH6SvjPTrHNMU88vCQZyhgBzgw";
const bootstrapNodeTCP =
  process.env.REACT_APP_BOOTSTRAP_NODE_TCP ||
  "/ip4/3.215.160.238/tcp/4001/ipfs/QmVLEz2SxoNiFnuyLpbXsH6SvjPTrHNMU88vCQZyhgBzgw";


export const DefaultCid =
  process.env.REACT_APP_DEFAULT_CID ||
  "QmUWWqCNSdZmus7mc52um5cpqUi1CaE97AzBTY7iWfBXV9";

const getIpfs = async () => {
  return getIpfsWithConfig({
    localPeers: [bootstrapNodeTCP],
    browserPeers: [bootstrapNodeWSS]
  });
};

export const validPreferences = preferences => {
  return (
    preferences.codeStyle &&
    preferences.primaryColor &&
    preferences.primaryColor.length === 7 &&
    preferences.secondaryColor &&
    preferences.secondaryColor.length === 7 &&
    preferences.theme &&
    (preferences.theme === "light" || preferences.theme === "dark") &&
    preferences.username &&
    preferences.codeStyle
  );
};

export const loadPreferences = async cid => {
  const ipfs = await getIpfs();
  let resp, preferences;
  try {
    resp = await ipfs.cat(cid);
  } catch (err) {
    throw new Error("CID not found");
  }
  try {
    preferences = JSON.parse(resp);
  } catch (err) {
    throw new Error("CID does not contain preferences");
  }
  if (!validPreferences(preferences)) {
    throw new Error("Preferences are outdated. Try saving a new version.");
  }
  return preferences;
};

export const savePreferences = async preferences => {
  if (!validPreferences(preferences)) {
    throw new Error("Preferences are not valid. Try saving a new version.");
  }
  const ipfs = await getIpfs();
  const toAdd = Buffer.from(JSON.stringify(preferences));
  let resp, cid;
  try {
    resp = await ipfs.add(toAdd);
  } catch (err) {
    throw new Error("Content could not be uploaded to IPFS");
  }
  try {
    cid = resp[0].hash;
  } catch (err) {
    throw new Error("Could not parse CID");
  }
  try {
    if (username && password && ipfsProvider) {
      await pin(cid, { username, password }, ipfsProvider);
    }
  } catch (err) {
    console.error(err);
  }

  return cid;
};
