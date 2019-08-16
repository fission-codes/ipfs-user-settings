let ipfsInstance;

const getIpfs = () => {
  return new Promise(async (resolve, reject) => {
    // if already instantiated
    if (ipfsInstance) {
      return resolve(ipfsInstance);
    }

    if (window.ipfs) {
      let ipfs = window.ipfs;
      if (window.ipfs.enable) {
        console.log("window.ipfs.enable is available!");
        ipfs = await window.ipfs.enable({
          commands: ["id", "version", "add", "cat", "dag"]
        });
      } else {
        console.log("legacy window.ipfs is available!");
      }

      try {
        const id = await ipfs.id();
        if (id.id !== undefined && id.agentVersion !== undefined) {
          ipfsInstance = ipfs;
          return resolve(ipfs);
        }
      } catch (err) {}
      console.log(
        "cannot access window.ipfs, may not be connected to a working gateway"
      );
    }

    console.log("window.ipfs is not available, downloading from CDN...");
    const script = document.createElement("script");
    script.src = "https://unpkg.com/ipfs/dist/index.min.js";
    script.onload = () => {
      console.log("starting IPFS node");
      const ipfs = new window.Ipfs();
      ipfsInstance = ipfs;
      ipfs.once("ready", () => resolve(ipfs));
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export default getIpfs;
