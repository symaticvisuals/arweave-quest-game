// src/contracts/assets.ts
export async function handle(state, action) {
  switch (action.function) {
    case "startGame":
      return startGame(state, action.details);
    case "endGame":
      return endGame(state, action.details);
    case "updateScore":
      return updateScore(state, action.details);
    default:
      throw new Error(`Unrecognized function: ${action.function}`);
  }
}
function startGame(state, gameDetails) {
  if (!gameDetails) {
    throw new Error("Game details must be provided.");
  }
  state.currentGame = gameDetails;
  return state;
}
function endGame(state, gameDetails) {
  if (!gameDetails) {
    throw new Error("Game details must be provided.");
  }
  state.currentGame = null;
  return state;
}
function updateScore(state, playerScore) {
  if (!playerScore || !playerScore.playerId) {
    throw new Error("Player score details must be provided.");
  }
  state.leaderboard[playerScore.playerId] = playerScore;
  return state;
}
