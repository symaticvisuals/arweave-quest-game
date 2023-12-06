// src/contracts/ownership.ts
export async function handle(state, action) {
  const input = action.input;
  switch (input.type) {
    case "registerAsset":
      const registerInput = input;
      return { state: registerAsset(state, registerInput.assetId) };
    case "updateOwnership":
      const updateInput = input;
      return { state: updateOwnership(state, updateInput.assetId, updateInput.newOwners) };
    case "addContestWinner":
      const addWinnerInput = input;
      return { state: addContestWinner(state, addWinnerInput.assetId, addWinnerInput.winner) };
    case "distributeReward":
      const distributeInput = input;
      return { state: distributeReward(state, distributeInput.assetId) };
    default:
      throw new Error(`Unrecognized type`);
  }
}
function registerAsset(state, assetId) {
  if (state.assets[assetId]) {
    throw new Error("Asset already registered");
  }
  state.assets[assetId] = { id: assetId, owners: {}, contestWinners: [] };
  return state;
}
function updateOwnership(state, assetId, newOwners) {
  const asset = state.assets[assetId];
  if (!asset) {
    throw new Error("Asset not found");
  }
  asset.owners = newOwners;
  return state;
}
function addContestWinner(state, assetId, winner) {
  const asset = state.assets[assetId];
  if (!asset) {
    throw new Error("Asset not found");
  }
  asset.contestWinners.push(winner);
  return state;
}
function distributeReward(state, assetId) {
  const asset = state.assets[assetId];
  if (!asset) {
    throw new Error("Asset not found");
  }
  if (asset.contestWinners.length === 0) {
    throw new Error("No contest winners to distribute rewards to");
  }
  const ownershipShare = 100 / asset.contestWinners.length;
  asset.owners = asset.contestWinners.reduce((acc, winner) => {
    acc[winner] = ownershipShare;
    return acc;
  }, {});
  asset.contestWinners = [];
  return state;
}
