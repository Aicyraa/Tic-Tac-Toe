import { createPlayers } from "./players.js";
import { checkWinner, checkTie, resetBoard, updateScore } from "./gameUtil.js";

const elements = {
   slots: document.querySelectorAll(".cells"),
   startBtn: document.querySelector("#start"),
   restartBtn: document.querySelector("#restart"),
   resetBtn: document.querySelector("#reset"),
   p1Card: document.querySelector("#p1"),
   p2Card: document.querySelector("#p2"),
   turnLabel: document.querySelector("#turn-label"),
   modal: document.querySelector("#result-modal"),
   modalMessage: document.querySelector("#result-message"),
   modalClose: document.querySelector("#modal-close"),
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
   updateTurnUI();
   elements.slots.forEach((slot) => {
      slot.classList.remove("x", "o", "winning-cell");
      slot.addEventListener("click", handleSlotClick);
   });
   elements.startBtn.classList.add("hidden");
   elements.restartBtn.classList.remove("hidden");
   elements.resetBtn.classList.remove("hidden");
   
   elements.modalClose.onclick = () => {
      elements.modal.classList.remove("show");
      resetBoard();
      initializeGame();
   };

   elements.restartBtn.onclick = () => {
      resetBoard();
      initializeGame();
   };

   elements.resetBtn.onclick = () => {
      location.reload(); // Simple way to reset everything for now
   };
}

function updateTurnUI() {
   elements.p1Card.classList.toggle("active", rd.currentPlayer === rd.players[0]);
   elements.p2Card.classList.toggle("active", rd.currentPlayer === rd.players[1]);
   elements.turnLabel.textContent = `${rd.currentPlayer.name}'s Turn`;
}

// players funcs

function handleSlotClick(event) {
   const target = event.target;
   const index = target.getAttribute("index");

   if (!game.isSlotEmpty(index) || rd.currentPlayer.name === "AI") return;

   setMove(index, rd.currentPlayer);
}

function setMove(idx, player) {
   const currentEl = elements.slots[idx];
   game.setSlot(idx, player);
   currentEl.classList.add(player.value);

   const result = checkWinner(game.getBoard(), player.value);
   if (result.isWin) {
      highlightWinner(result.pattern);
      showResult(`${player.name} Wins!`);
      updateScore(player);
      return;
   } else if (checkTie(game.getBoard())) {
      showResult("It's a Tie!");
      return;
   }

   game.switchPlayer(rd.players, player);
   updateTurnUI();

   if (rd.currentPlayer.name === "AI") {
      setTimeout(() => {
         const AImove = getBestMove(game.getBoard());
         if (AImove !== undefined) setMove(AImove, rd.currentPlayer);
      }, 600); // Slight delay for realistic feel
   }
}

function highlightWinner(pattern) {
   pattern.forEach(idx => elements.slots[idx].classList.add("winning-cell"));
}

function showResult(message) {
   elements.modalMessage.textContent = message;
   setTimeout(() => elements.modal.classList.add("show"), 500);
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
   const winO = checkWinner(board, "o");
   if (winO.isWin) return 100 - depth;
   const winX = checkWinner(board, "x");
   if (winX.isWin) return depth - 100;
   return 0;
}

function minimax(board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) {
   const score = evaluateBoard(board, depth);
   if (score !== 0) return score;
   if (getAvailSlots(board).length === 0) return 0;

   if (isMaximizing) {
      let bestScore = -Infinity;
      for (const spot of getAvailSlots(board)) {
         const newBoard = makeMove(board, spot, true);
         const currentScore = minimax(newBoard, depth + 1, false, alpha, beta);
         bestScore = Math.max(bestScore, currentScore);
         alpha = Math.max(alpha, currentScore);
         if (beta <= alpha) break;
      }
      return bestScore;
   } else {
      let bestScore = Infinity;
      for (const spot of getAvailSlots(board)) {
         const newBoard = makeMove(board, spot, false);
         const currentScore = minimax(newBoard, depth + 1, true, alpha, beta);
         bestScore = Math.min(bestScore, currentScore);
         beta = Math.min(beta, currentScore);
         if (beta <= alpha) break;
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