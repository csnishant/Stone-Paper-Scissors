export const determineRoundWinner = (p1, p2) => {
  if (p1 === p2) return "Tie";
  if (
    (p1 === "stone" && p2 === "scissors") ||
    (p1 === "scissors" && p2 === "paper") ||
    (p1 === "paper" && p2 === "stone")
  ) {
    return "Player 1";
  }
  return "Player 2";
};
