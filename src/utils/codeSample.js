export default `
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
`;
