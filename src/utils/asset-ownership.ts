import { writeContract } from "arweavekit/contract";

// Initialize ArweaveKit with necessary configurations

// Define the types as per your contract
type RegisterAssetInput = {
  type: "registerAsset";
  assetId: string;
};

type UpdateOwnershipInput = {
  type: "updateOwnership";
  assetId: string;
  newOwners: Record<string, number>;
};

type AddContestWinnerInput = {
  type: "addContestWinner";
  assetId: string;
  winner: string;
};

type DistributeRewardInput = {
  type: "distributeReward";
  assetId: string;
};

type Action = {
  input:
    | RegisterAssetInput
    | UpdateOwnershipInput
    | AddContestWinnerInput
    | DistributeRewardInput;
  caller: string; // Adjust as per how you identify callers
};

const registerAsset = async (
  assetId: string,
  caller: string
): Promise<void> => {
  await writeContract({
    environment: "mainnet",
    contractTxId: "KFP5iFmYYJLOlarDoa4oxJTo78bbGf0XcfYgbvdORdM",
    strategy: "both",
    // wallet: "use-wallet", // Replace with actual wallet instance/logic
    options: {
      function: "registerAsset",
      type: "registerAsset",
      assetId,
      input: {
        type: "registerAsset",
        assetId,
      },
      caller,
    },
  });
};

// Interaction function for updating ownership
const updateOwnership = async (
  assetId: string,
  newOwners: Record<string, number>,
  caller: string
): Promise<void> => {
  await writeContract({
    environment: "mainnet",
    contractTxId: "KFP5iFmYYJLOlarDoa4oxJTo78bbGf0XcfYgbvdORdM",
    wallet: "use-wallet",
    options: {
      function: "updateOwnership",
      input: {
        type: "updateOwnership",
        assetId,
        newOwners,
      },
      caller,
    },
  });
};

// Interaction function for adding a contest winner
const addContestWinner = async (
  assetId: string,
  winner: string,
  caller: string
): Promise<void> => {
  await writeContract({
    environment: "mainnet",
    contractTxId: "KFP5iFmYYJLOlarDoa4oxJTo78bbGf0XcfYgbvdORdM",
    wallet: "use-wallet",
    options: {
      function: "addContestWinner",
      input: {
        type: "addContestWinner",
        assetId,
        winner,
      },
      caller,
    },
  });
};

// Interaction function for distributing rewards
const distributeReward = async (
  assetId: string,
  caller: string
): Promise<void> => {
  await writeContract({
    environment: "mainnet",
    contractTxId: "KFP5iFmYYJLOlarDoa4oxJTo78bbGf0XcfYgbvdORdM",
    wallet: "use-wallet",
    options: {
      function: "distributeReward",
      input: {
        type: "distributeReward",
        assetId,
      },
      caller,
    },
  });
};

export { registerAsset, updateOwnership, addContestWinner, distributeReward };
