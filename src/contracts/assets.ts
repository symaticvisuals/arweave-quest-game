import {
    AssetState,
    AssetDetails,
    OwnershipShare,
    AssetActionInput,
    TransferDetails,
    Action, Input, User, Timestamp
} from './interfaces';

export async function handle(state: AssetState, action: Action): Promise<AssetState> {
    const input = action.input as AssetActionInput;
    const caller = action.caller;

    switch (input.function) {
        case 'createAsset':
            if (!input.assetDetails) {
                throw new Error('Asset details must be provided.');
            }
            return createAsset(state, input.assetDetails, caller);
        case 'transferShare':
            if (!input.transferDetails) {
                throw new Error('Transfer details must be provided.');
            }
            return transferShare(state, input.transferDetails, caller);
        default:
            throw new Error(`Unrecognized function: ${input.function}`);
    }
}

function createAsset(state: AssetState, assetDetails: AssetDetails, caller: string): AssetState {
    if (state.assets[assetDetails.assetId]) {
        throw new Error('Asset already exists.');
    }

    state.assets[assetDetails.assetId] = {
        ...assetDetails,
        creator: caller
    };

    state.ownershipShares[assetDetails.assetId] = {
        assetId: assetDetails.assetId,
        owner: caller,
        sharePercentage: 100
    };

    return state;
}

function transferShare(state: AssetState, transferDetails: TransferDetails, caller: string): AssetState {
    const share = state.ownershipShares[transferDetails.assetId];

    if (!share || share.owner !== caller) {
        throw new Error('Caller does not own the asset share.');
    }

    if (share.sharePercentage < transferDetails.sharePercentage) {
        throw new Error('Caller does not have enough share to transfer.');
    }

    share.sharePercentage -= transferDetails.sharePercentage;

    const newShare = state.ownershipShares[transferDetails.to] || {
        assetId: transferDetails.assetId,
        owner: transferDetails.to,
        sharePercentage: 0
    };
    newShare.sharePercentage += transferDetails.sharePercentage;
    state.ownershipShares[transferDetails.to] = newShare;

    return state;
}
