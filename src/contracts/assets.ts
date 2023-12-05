import {
  GameState,
  PlayerScore,
  GameDetails,
  GameActionInput,
} from "../interfaces/interfaces";

export async function handle(
  state: GameState,
  action: GameActionInput
): Promise<GameState> {
  switch (action.function) {
    case "startGame":
      return startGame(state, action.details as GameDetails);
    case "endGame":
      return endGame(state, action.details as GameDetails);
    case "updateScore":
      return updateScore(state, action.details as PlayerScore);
    default:
      throw new Error(`Unrecognized function: ${action.function}`);
  }
}

function startGame(state: GameState, gameDetails: GameDetails): GameState {
  if (!gameDetails) {
    throw new Error("Game details must be provided.");
  }
  state.currentGame = gameDetails;
  return state;
}

function endGame(state: GameState, gameDetails: GameDetails): GameState {
  if (!gameDetails) {
    throw new Error("Game details must be provided.");
  }
  state.currentGame = null;
  return state;
}

function updateScore(state: GameState, playerScore: PlayerScore): GameState {
  if (!playerScore || !playerScore.playerId) {
    throw new Error("Player score details must be provided.");
  }
  state.leaderboard[playerScore.playerId] = playerScore;
  return state;
}
