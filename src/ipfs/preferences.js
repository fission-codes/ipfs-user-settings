import getIpfs from "../ipfs/getIpfs";

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
  if (!preferences.codeStyle) {
    throw new Error("CID does not contain preferences");
  }
  return preferences;
};

export const savePreferences = async preferences => {
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
  return cid;
};
