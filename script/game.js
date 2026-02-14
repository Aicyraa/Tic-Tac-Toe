import { createPlayers } from "./players.js";
import { checkWinner, checkTie, resetBoard, updateScore } from "./gameUtil.js";

const elements = {
   slots: document.querySelectorAll(".cells"),
   startBtn: document.querySelector("#start"),
};

const rd = {
   players: null,
   currentPlayer: null,
   oponent: () =>
      rd.currentPlayer === rd.players[0] ? rd.players[1] : rd.players[0],
};

const game = (function () {
   let board = ["", "", "", "", "", "", "", "", ""];

   const getBoard = () => board;
   const setBoard = (newBoard) => (board = newBoard);
   const isSlotEmpty = (idx) => board[idx] === "";
   const setSlot = (idx, player) => (board[idx] = player.value);
   const switchPlayer = (players, current) =>
      (rd.currentPlayer = current === players[0] ? players[1] : players[0]);
   return { getBoard, setBoard, isSlotEmpty, setSlot, switchPlayer };
})();

(function init() {
   elements.startBtn.addEventListener("click", initializeGame);
})();

// Games

function initializeGame() {
   rd.players = createPlayers();
   rd.currentPlayer = rd.players[0];
   elements.slots.forEach((slot) =>
      slot.addEventListener("click", handleSlotClick),
   );
}

// players funcs

function handleSlotClick(event) {
   function setSlot(idx, player) {
      const currentEl = elements.slots[idx];
      game.setSlot(idx, player);
      game.switchPlayer(rd.players, player);
      currentEl.classList.add(player.value);

      if (checkWinner(game.getBoard(), player.value)) {
         alert("Winner: " + player.name);
         updateScore(player);
         resetBoard();
      } else if (checkTie(game.getBoard())) {
         alert("It's a tie!");
         resetBoard();
      }
   }

   const target = event.target;
   const index = target.getAttribute("index");

   if (!game.isSlotEmpty(index)) {
      return;
   } else {
      setSlot(index, rd.currentPlayer);
   }

   // AI's turn
   if (getAvailSlots(game.getBoard()).length > 0) {
      const AImove = getBestMove(game.getBoard());
      setSlot(AImove, rd.currentPlayer);
   }
}

// algorithm

function getAvailSlots(board) {
   return board
      .map((v, i) => ({ v, i }))
      .filter((s) => s.v === "")
      .map((s) => s.i);
}

function makeMove(board, index, isMaximizing) {
   const newBoard = [...board];
   newBoard[index] = isMaximizing ? "o" : "x";
   return newBoard;
}

function evaluateBoard(board, depth) {
   if (checkWinner(board, "o")) return 10 - depth;
   else if (checkWinner(board, "x")) return depth - 10;
   else return 0;
}

function minimax(board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) {
   const score = evaluateBoard(board, depth);
   if (score !== 0 || getAvailSlots(board).length === 0) return score;

   depth++;

   if (isMaximizing) {
      let bestScore = -Infinity;
      for (const spot of getAvailSlots(board)) {
         const newBoard = makeMove(board, spot, isMaximizing);
         const currentScore = minimax(newBoard, depth, false, alpha, beta);
         bestScore = Math.max(bestScore, currentScore);
         alpha = Math.max(alpha, currentScore);
         if (beta <= alpha) break; // Alpha-beta pruning
      }
      return bestScore;
   } else {
      let bestScore = Infinity;
      for (const spot of getAvailSlots(board)) {
         const newBoard = makeMove(board, spot, isMaximizing);
         const currentScore = minimax(newBoard, depth, true, alpha, beta);
         bestScore = Math.min(bestScore, currentScore);
         beta = Math.min(beta, currentScore);
         if (beta <= alpha) break; // Alpha-beta pruning
      }
      return bestScore;
   }
}

// Opening book for variety - all moves are optimal but adds unpredictability
function getOpeningMove(board) {
   const moveCount = board.filter(cell => cell !== "").length;
   
   // First move (AI goes first) - vary between center and corners
   if (moveCount === 0) {
      const options = [4, 0, 2, 6, 8]; // Center + all corners
      return options[Math.floor(Math.random() * options.length)];
   }
   
   // Second move (player went first)
   if (moveCount === 1) {
      // If player took center, take a random corner
      if (board[4] === "x") {
         const corners = [0, 2, 6, 8];
         return corners[Math.floor(Math.random() * corners.length)];
      }
      
      // If player took corner, always take center
      if (board[0] === "x" || board[2] === "x" || board[6] === "x" || board[8] === "x") {
         return 4;
      }
      
      // If player took edge, take center
      return 4;
   }
   
   // After opening, use minimax
   return null;
}

function getBestMove(board) {
   // Check opening book first for variety
   const openingMove = getOpeningMove(board);
   if (openingMove !== null) {
      return openingMove;
   }
   
   let bestScore = -Infinity;
   let bestMoves = [];
   let depth = 0;

   // Shuffle available slots to add variety in move order evaluation
   const slots = getAvailSlots(board);
   const shuffledSlots = slots.sort(() => Math.random() - 0.5);

   for (const spot of shuffledSlots) {
      const newBoard = makeMove(board, spot, true);
      const score = minimax(newBoard, depth, false);

      if (score > bestScore) {
         bestScore = score;
         bestMoves = [spot];
      } else if (score === bestScore) {
         bestMoves.push(spot);
      }
   }

   // Randomly choose among equally good moves
   const randomIndex = Math.floor(Math.random() * bestMoves.length);
   return bestMoves[randomIndex];
}

export { elements, game };