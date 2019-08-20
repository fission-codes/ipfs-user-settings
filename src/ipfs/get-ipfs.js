let ipfsInstance;
const DEFAULT_PERMISSIONS = ["id", "version", "add", "cat", "dag"];

const addBootstrapPeers = async (ipfs, peers) => {
  if (peers && peers.length > 0) {
    const isOnline = await ipfs.isOnline();
    if (isOnline) {
      await ipfs.stop();
    }
    await Promise.all(peers.map(p => ipfs.bootstrap.add(p)));
    await ipfs.start();
  }
  return ipfs;
};

const normalizePermissions = (permissions = DEFAULT_PERMISSIONS) => {
  if (permissions.indexOf("id") < 0) {
    permissions.push("id");
  }
  if (permissions.indexOf("version") < 0) {
    permissions.push("version");
  }
  return permissions;
};

export const ipfsIsWorking = async ipfs => {
  try {
    const id = await ipfs.id();
    if (id.id !== undefined && id.agentVersion !== undefined) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const loadWindowIpfs = async config => {
  if (window.ipfs) {
    let ipfs = window.ipfs;
    if (window.ipfs.enable) {
      const permissions = normalizePermissions(config.permissions);
      ipfs = await window.ipfs.enable({
        commands: permissions
      });
    }
    const isWorking = await ipfsIsWorking(ipfs);
    if (isWorking) {
      await addBootstrapPeers(ipfs, config.bootstrap);
      return ipfs;
    } else {
      return null;
    }
  }
  return null;
};

export const loadJsIpfs = async config => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/ipfs/dist/index.min.js";
    script.onload = async () => {
      const ipfs = await window.Ipfs.create({ start: false });
      await addBootstrapPeers(ipfs, config.bootstrap);
      const isWorking = await ipfsIsWorking(ipfs);
      if (isWorking) {
        resolve(ipfs);
      } else {
        reject(new Error("js-ipfs is not able to load"));
      }
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const getIpfs = async (config = {}) => {
  // if already instantiated
  if (ipfsInstance) {
    return ipfsInstance;
  }

  ipfsInstance = await loadWindowIpfs(config);
  if (ipfsInstance) {
    console.log("window.ipfs is available!");
  } else {
    console.log("window.ipfs is not available, downloading from CDN...");
    ipfsInstance = await loadJsIpfs(config);
  }

  return ipfsInstance;
};

export default getIpfs;
