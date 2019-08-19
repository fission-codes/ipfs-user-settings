let ipfsInstance;
const DEFAULT_PERMISSIONS = ["id", "version", "add", "cat", "dag"];

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

export const loadWindowIpfs = async permissions => {
  if (window.ipfs) {
    let ipfs = window.ipfs;
    if (window.ipfs.enable) {
      // if user set permissions, make sure id and version are both added
      if (permissions.indexOf("id") < 0) {
        permissions.push("id");
      }
      if (permissions.indexOf("version") < 0) {
        permissions.push("version");
      }
      ipfs = await window.ipfs.enable({
        commands: permissions
      });
    }
    const isWorking = await ipfsIsWorking(ipfs);
    if (isWorking) {
      return ipfs;
    } else {
      return null;
    }
  }
  return null;
};

export const loadJsIpfs = async () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/ipfs/dist/index.min.js";
    script.onload = async () => {
      const ipfs = await window.Ipfs.create();
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

const getIpfs = async (permissions = DEFAULT_PERMISSIONS) => {
  // if already instantiated
  if (ipfsInstance) {
    return ipfsInstance;
  }

  ipfsInstance = await loadWindowIpfs(permissions);
  if (ipfsInstance) {
    console.log("window.ipfs is available!");
    return ipfsInstance;
  }

  console.log("window.ipfs is not available, downloading from CDN...");
  ipfsInstance = await loadJsIpfs();
  return ipfsInstance;
};

export default getIpfs;
