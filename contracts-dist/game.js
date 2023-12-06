// src/contracts/game.ts
export async function handle(state, action) {
  switch (action.function) {
    case "startGame":
    case "endGame":
      if (!isGameDetails(action.details)) {
        throw new Error("Invalid details for the game action.");
      }
      return action.function === "startGame" ? startGame(state, action.details) : endGame(state, action.details);
    case "updateScore":
      if (!isPlayerScore(action.details)) {
        throw new Error("Invalid details for updating score.");
      }
      return updateScore(state, action.details);
    default:
      throw new Error(`Unrecognized function: ${action.function}`);
  }
}
function isGameDetails(details) {
  return details && typeof details === "object" && "gameId" in details;
}
function isPlayerScore(details) {
  return details && typeof details === "object" && "playerId" in details;
}
function startGame(state, gameDetails) {
  state.currentGame = gameDetails;
  return state;
}
function endGame(state, gameDetails) {
  state.currentGame = null;
  return state;
}
function updateScore(state, playerScore) {
  const playerIdentifier = playerScore.username;
  state.leaderboard[playerIdentifier] = playerScore;
  return state;
}
