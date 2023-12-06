type State = {
    assets: Record<string, Asset>;
};

type Asset = {
    id: string;
    owners: Record<string, number>;
    contestWinners: string[];
};

type RegisterAssetInput = {
    type: 'registerAsset';
    assetId: string;
};

type UpdateOwnershipInput = {
    type: 'updateOwnership';
    assetId: string;
    newOwners: Record<string, number>;
};

type AddContestWinnerInput = {
    type: 'addContestWinner';
    assetId: string;
    winner: string;
};

type DistributeRewardInput = {
    type: 'distributeReward';
    assetId: string;
};

type Input = RegisterAssetInput | UpdateOwnershipInput | AddContestWinnerInput | DistributeRewardInput;

type Action = {
    input: Input;
    caller: string;
};

const initialState: State = {
    assets: {},
};

export async function handle(state: State, action: Action): Promise<{ state: State }> {
    const input = action.input;

    switch (input.type) {
        case 'registerAsset':
            const registerInput = input as RegisterAssetInput;
            return { state: registerAsset(state, registerInput.assetId) };

        case 'updateOwnership':
            const updateInput = input as UpdateOwnershipInput;
            return { state: updateOwnership(state, updateInput.assetId, updateInput.newOwners) };

        case 'addContestWinner':
            const addWinnerInput = input as AddContestWinnerInput;
            return { state: addContestWinner(state, addWinnerInput.assetId, addWinnerInput.winner) };

        case 'distributeReward':
            const distributeInput = input as DistributeRewardInput;
            return { state: distributeReward(state, distributeInput.assetId) };

        default:
            throw new Error(`Unrecognized type`);
    }
}


function registerAsset(state: State, assetId: string): State {
    if (state.assets[assetId]) {
        throw new Error('Asset already registered');
    }

    state.assets[assetId] = { id: assetId, owners: {}, contestWinners: [] };
    return state;
}

function updateOwnership(state: State, assetId: string, newOwners: Record<string, number>): State {
    const asset = state.assets[assetId];
    if (!asset) {
        throw new Error('Asset not found');
    }

    asset.owners = newOwners;
    return state;
}

function addContestWinner(state: State, assetId: string, winner: string): State {
    const asset = state.assets[assetId];
    if (!asset) {
        throw new Error('Asset not found');
    }

    asset.contestWinners.push(winner);
    return state;
}

function distributeReward(state: State, assetId: string): State {
    const asset = state.assets[assetId];
    if (!asset) {
        throw new Error('Asset not found');
    }

    if (asset.contestWinners.length === 0) {
        throw new Error('No contest winners to distribute rewards to');
    }

    const ownershipShare = 100 / asset.contestWinners.length;
    asset.owners = asset.contestWinners.reduce<Record<string, number>>((acc, winner) => {
        acc[winner] = ownershipShare;
        return acc;
    }, {});

    asset.contestWinners = [];

    return state;
}
