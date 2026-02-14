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
   const target = event.target;
   const index = target.getAttribute("index");

   if (!game.isSlotEmpty(index)) { return;
   } else {game.setSlot(index, rd.currentPlayer);}
   target.classList.add(rd.currentPlayer.value);

   game.switchPlayer(rd.players, rd.currentPlayer);

   // AI's turn
   const AImove = getBestMove(game.getBoard());
   game.setSlot(AImove, rd.currentPlayer);

   game.switchPlayer(rd.players, rd.currentPlayer)
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

function evaluateBoard(board) {
   if (checkWinner(board, "x")) return 10;
   else if (checkWinner(board, "o")) return -10;
   else return 0;
}

function minimax(board, isMaximizing = true) {
   console.log(board);
   
   const score = evaluateBoard(board);
   if (score || getAvailSlots(board).length === 0) return score;
   
   const scoreList = [];
   
   for (const spots of getAvailSlots(board)){
      const newBoard = makeMove(board, spots, isMaximizing)
      scoreList.push(minimax(newBoard, !isMaximizing))

      
   }

}

function getBestMove(board) {
   const bestMove = minimax(board)
   return bestMove
}

export { elements, game };
