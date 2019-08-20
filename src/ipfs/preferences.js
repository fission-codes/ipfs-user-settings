import getIpfsWithConfig from "../ipfs/get-ipfs";

export const DefaultCid = "QmUMQ5Zxu94gwGq96hGEBc2hzoMkywUctbySw7YY6g8ktw";

const getIpfs = async () => {
  return await getIpfsWithConfig({
    bootstrap: [
      "/ip4/127.0.0.1/tcp/4002/ws/ipfs/QmY4N8hPzGQUPDJc8tMWuQokJswStUZk9SkBACCHoVZpCS"
    ]
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
  return cid;
};
