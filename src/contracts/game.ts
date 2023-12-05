import {
    GameState,
    Leaderboard,
    PlayerScore,
    GameDetails,
    GameActionInput
} from './interfaces';

export async function handle(state: GameState, action: GameActionInput): Promise<GameState> {
    switch (action.function) {
        case 'startGame':
        case 'endGame':
            if (!isGameDetails(action.details)) {
                throw new Error('Invalid details for the game action.');
            }
            return action.function === 'startGame'
                ? startGame(state, action.details)
                : endGame(state, action.details);

        case 'updateScore':
            if (!isPlayerScore(action.details)) {
                throw new Error('Invalid details for updating score.');
            }
            return updateScore(state, action.details);
            
        default:
            throw new Error(`Unrecognized function: ${action.function}`);
    }
}

function isGameDetails(details: any): details is GameDetails {
    return details && typeof details === 'object' && 'gameId' in details;
}

function isPlayerScore(details: any): details is PlayerScore {
    return details && typeof details === 'object' && 'playerId' in details;
}

function startGame(state: GameState, gameDetails: GameDetails): GameState {
    state.currentGame = gameDetails;
    return state;
}

function endGame(state: GameState, gameDetails: GameDetails): GameState {
    state.currentGame = null;
    return state;
}

function updateScore(state: GameState, playerScore: PlayerScore): GameState {
    const playerIdentifier = playerScore.username;
    state.leaderboard[playerIdentifier] = playerScore;
    return state;
}

