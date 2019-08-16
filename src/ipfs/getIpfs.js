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

const getIpfs = (permissions = DEFAULT_PERMISSIONS) => {
  return new Promise(async (resolve, reject) => {
    // if already instantiated
    if (ipfsInstance) {
      return resolve(ipfsInstance);
    }

    if (window.ipfs) {
      let ipfs = window.ipfs;
      if (window.ipfs.enable) {
        console.log("window.ipfs.enable is available!");
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
      } else {
        console.log("legacy window.ipfs is available!");
      }
      const isWorking = await ipfsIsWorking(ipfs);
      if (isWorking) {
        ipfsInstance = ipfs;
        resolve(ipfsInstance);
      } else {
        console.log(
          "cannot access window.ipfs, may not be connected to a working gateway"
        );
      }
    }

    console.log("window.ipfs is not available, downloading from CDN...");
    const script = document.createElement("script");
    script.src = "https://unpkg.com/ipfs/dist/index.min.js";
    script.onload = async () => {
      const ipfs = await window.Ipfs.create();
      const isWorking = await ipfsIsWorking(ipfs);
      if (isWorking) {
        ipfsInstance = ipfs;
        resolve(ipfsInstance);
      } else {
        reject(new Error("js-ipfs is not able to load"));
      }
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export default getIpfs;
