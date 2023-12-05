export interface Action {
    input: Input;
    caller: string;
}

export interface Input {
    function: string;
    [key: string]: any;
}

export interface User {
    id: string;
    walletAddress: string;
    username: string;
}

export type Timestamp = string;

export interface AssetState {
    assets: Record<string, AssetDetails>;
    ownershipShares: Record<string, OwnershipShare>;
}

export interface AssetDetails {
    assetId: string;
    title: string;
    description: string;
    creator: string;
    imageTxId: string;
}

export interface OwnershipShare {
    assetId: string;
    owner: string;
    sharePercentage: number;
}

export interface AssetActionInput {
    function: 'createAsset' | 'transferShare';
    assetDetails: AssetDetails | null;
    transferDetails: TransferDetails | null;
}

export interface TransferDetails {
    assetId: string;
    from: string;
    to: string;
    sharePercentage: number;
}


export interface GameState {
    leaderboard: Leaderboard;
    currentGame: GameDetails | null;
}

export interface Leaderboard {
    [playerId: string]: PlayerScore;
}

export interface PlayerScore {
    [x: string]: any;
    score: number;
    playerId: string;
    lastUpdated: string;
}

export interface GameDetails {
    gameId: string;
    startTime: string;
    endTime: string;
    participants: string[];
}

export interface GameActionInput {
    function: 'startGame' | 'endGame' | 'updateLeaderboard' | 'updateScore';
    details: GameDetails | PlayerScore;
}