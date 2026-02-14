// Game funcs
import { game, elements } from "./game.js";

function checkWinner(board, player) {
   const WIN_PATTERNS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];

   for (const pattern of WIN_PATTERNS) {
      const isWin = pattern.every((idx) => board[idx] === player);
      if (isWin) return true;
   }
   
   return false;
}

function checkTie() {
   // add another conditon pattern
   const emptySlots = game.getBoard().filter((v) => v === "");
   return emptySlots.length === 1;
}

function resetBoard() {
   game.setBoard(["", "", "", "", "", "", "", "", ""]);
   elements.slots.forEach((slot) => slot.classList.remove("x", "o"));
}

function updateScore(player) {
   const AIScore = document.querySelectorAll(".score")[1];
   const PlayerScore = document.querySelectorAll(".score")[0];

   if (player == null) {
      return;
   } else if (player.name === "AI") {
      AIScore.textContent = ++player.score;
   } else {
      PlayerScore.textContent = ++player.score;
   }
}

export { checkWinner, checkTie, resetBoard, updateScore };
