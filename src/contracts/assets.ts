import {
  AssetState,
  AssetDetails,
  OwnershipShare,
  AssetActionInput,
  TransferDetails,
} from "../interfaces/interfaces";

export async function handle(
  state: AssetState,
  action: AssetActionInput,
  caller: string
): Promise<AssetState> {
  switch (action.function) {
    case "createAsset":
      if (!action.assetDetails) {
        throw new Error("Asset details must be provided.");
      }
      return createAsset(state, action, caller);
    case "transferShare":
      if (!action.transferDetails) {
        throw new Error("Transfer details must be provided.");
      }
      return transferShare(state, action, caller);
    default:
      throw new Error(`Unrecognized function: ${action.function}`);
  }
}

function createAsset(
  state: AssetState,
  action: AssetActionInput,
  caller: string
): AssetState {
  const assetDetails = action.assetDetails as AssetDetails;
  if (!assetDetails || !assetDetails.assetId) {
    throw new Error("Asset details must be provided.");
  }

  if (state.assets[assetDetails.assetId]) {
    throw new Error("Asset already exists.");
  }

  state.assets[assetDetails.assetId] = {
    ...assetDetails,
    creator: caller,
  };

  state.ownershipShares[assetDetails.assetId] = {
    assetId: assetDetails.assetId,
    owner: caller,
    sharePercentage: 100,
  };

  return state;
}

function transferShare(
  state: AssetState,
  action: AssetActionInput,
  caller: string
): AssetState {
  const transferDetails = action.transferDetails as TransferDetails;
  if (
    !transferDetails ||
    !transferDetails.assetId ||
    !transferDetails.to ||
    typeof transferDetails.sharePercentage !== "number"
  ) {
    throw new Error("Transfer details must be provided.");
  }

  const share = state.ownershipShares[transferDetails.assetId];
  if (!share || share.owner !== caller) {
    throw new Error("Caller does not own the asset share.");
  }

  if (share.sharePercentage < transferDetails.sharePercentage) {
    throw new Error("Caller does not have enough share to transfer.");
  }

  share.sharePercentage -= transferDetails.sharePercentage;

  const newShare = state.ownershipShares[transferDetails.to] || {
    assetId: transferDetails.assetId,
    owner: transferDetails.to,
    sharePercentage: 0,
  };
  newShare.sharePercentage += transferDetails.sharePercentage;
  state.ownershipShares[transferDetails.to] = newShare;

  return state;
}
