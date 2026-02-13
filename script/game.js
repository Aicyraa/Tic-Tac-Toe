import { createPlayers } from "./players.js";
import { checkWinner, checkTie, resetBoard, updateScore } from "./gameUtil.js";

export const elements = {
   slots: document.querySelectorAll(".cells"),
   startBtn: document.querySelector("#start"),
};

const rd = {
   currentPlayer: null,
   players: null,
   filledSlots: [],
};

const game = (function () {
   let board = ["", "", "", "", "", "", "", "", ""];

   const getBoard = () => board;
   const setBoard = (newBoard) => (board = newBoard);
   const isSlotEmpty = (idx) => board[idx] === "";
   const setSlot = (idx, player) => (board[idx] = player.value);
   const switchPlayer = (players, current) => current === players[0] ? players[1] : players[0];

   return { getBoard, setBoard, isSlotEmpty, setSlot, switchPlayer };
})();


function declareWinner(player) {
   function newRound(msg, player) {
      return setTimeout(() => {
         alert(msg)
         updateScore(player)
         resetBoard(game, rd.filledSlots)
      }, 300)
   }

   const winner = checkWinner(player, game.getBoard())
   const isTie = checkTie(game.getBoard());

   if (winner) {newRound(`Winner: ${player.name} | ${player.value}`, player)}
   else if (isTie) {newRound("Tie!")}

   // returns false if the current game status is not tie or has a winner
   return false 
}

(function init() {
   elements.startBtn.addEventListener("click", initializeGame);
})();

// Games

function initializeGame() {
   rd.players = createPlayers();
   rd.currentPlayer = rd.players[0];
   elements.slots.forEach((slot) => slot.addEventListener("click", handleSlotClick));
}

// players funcs

function handleSlotClick(event) {
   const target = event.target;
   const index = target.getAttribute("index");
   // clicking
   if (!game.isSlotEmpty(index) || rd.currentPlayer !== rd.players[0]) { return }
   
   game.setSlot(index, rd.currentPlayer)
   target.classList.add(rd.currentPlayer.value)

   if (declareWinner(rd.currentPlayer, game.getBoard())) { return }
   else { rd.currentPlayer = game.switchPlayer(rd.players, rd.currentPlayer); playAITurn();}
}

function playAITurn() {
   setTimeout(() => {
      console.log(game.getBoard());
      const target = getAIMove();

      // gui
      target.classList.add(rd.currentPlayer.value);
      
      if (declareWinner(rd.currentPlayer)) return;
      rd.currentPlayer = game.switchPlayer(rd.players, rd.currentPlayer);

   }, 200);
}

function getAIMove() {
   while (true) {
      var randomIdx = Math.floor(Math.random() * 9);
      
      if (rd.filledSlots.includes(randomIdx)) {
         continue
      } else if (!game.isSlotEmpty(randomIdx)) {
         rd.filledSlots.push(randomIdx); 
         continue
      } else {
         game.setSlot(randomIdx, rd.currentPlayer);
      }
      
      break;
   }

   return elements.slots[randomIdx];
}

