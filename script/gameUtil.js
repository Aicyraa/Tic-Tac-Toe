// Game funcs
import { game, elements } from "./game.js";

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

function checkWinner(board, player) {
   for (const pattern of WIN_PATTERNS) {
      const isWin = pattern.every((idx) => board[idx] === player);
      if (isWin) return { isWin: true, pattern };
   }
   
   return { isWin: false };
}

function checkTie(board) {
   return board.every((v) => v !== "");
}

function resetBoard() {
   game.setBoard(["", "", "", "", "", "", "", "", ""]);
   elements.slots.forEach((slot) => {
      slot.classList.remove("x", "o", "winning-cell");
   });
}

function updateScore(player) {
   const p1Score = document.querySelector("#p1 .score");
   const p2Score = document.querySelector("#p2 .score");

   if (player.name === "AI") {
      p2Score.textContent = ++player.score;
   } else {
      p1Score.textContent = ++player.score;
   }
}

export { checkWinner, checkTie, resetBoard, updateScore, WIN_PATTERNS };
