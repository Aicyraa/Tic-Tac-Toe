const game = (function () {
   let board = ["", "", "", "", "", "", "", "", ""];

   const getBoard = () => board;
   const setBoard = (newBoard) => (board = newBoard);
   const isSlotEmpty = (idx) => board[idx] === "";
   const setSlot = (idx, player) => (board[idx] = player.value);
   const switchPlayer = (players, current) =>
      current === players[0] ? players[1] : players[0];

   return { getBoard, setBoard, isSlotEmpty, setSlot, switchPlayer };
})();

const elements = {
   slots: document.querySelectorAll(".cells"),
   startBtn: document.querySelector("#start"),
};

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

let currentPlayer = null;
let players = null;
let filledSlots = [];

(function init() {
   elements.startBtn.addEventListener("click", initializeGame);
})();

// Games

function initializeGame() {
   players = createPlayers();
   currentPlayer = players[0];
   elements.slots.forEach((slot) =>
      slot.addEventListener("click", handleSlotClick),
   );
}

function createPlayers(playerName = "Jee", opponentName = "AI") {
   const createPlayer = (name, value) => ({
      name,
      value,
      score: 0,
      toString() {
         return `${this.name} : ${this.value}`;
      },
   });

   return [createPlayer(playerName, "x"), createPlayer(opponentName, "o")];
}

function buttonHandler() {}

// players funcs

function handleSlotClick(event) {
   function makeMove(target, index) {
      game.setSlot(index, currentPlayer);
      target.classList.add(currentPlayer.value);
   }

   const target = event.target;
   const index = target.getAttribute("index");

   if (!game.isSlotEmpty(index) || currentPlayer !== players[0]) return;

   makeMove(target, index);

   if (checkGameEnd(currentPlayer)) return;
   else {
      currentPlayer = game.switchPlayer(players, currentPlayer);
      playAITurn();
   }
}

function playAITurn() {
   setTimeout(() => {
      const target = getAIMove();
      target.classList.add(currentPlayer.value);

      if (checkGameEnd(currentPlayer)) return;
      currentPlayer = game.switchPlayer(players, currentPlayer);

   }, 200);
}

function getAIMove() {

   while (true) {
      var randomIdx = Math.floor(Math.random() * 9);
      if (filledSlots.includes(randomIdx)) continue;
      if (!game.isSlotEmpty(randomIdx)) { filledSlots.push(randomIdx); continue;}
   
      game.setSlot(randomIdx, currentPlayer);
      break;
   }

   return elements.slots[randomIdx];
}

// Game funcs
function updateScore(player) {
   const PlayerScore = document.querySelectorAll(".score")[0];
   const AIScore = document.querySelectorAll(".score")[1];

   if (player == players[0]) {
      PlayerScore.textContent = ++player.score;
   } else {
      AIScore.textContent = ++player.score;
   }
}

function checkGameEnd(player) {
   function getWinner(player) {
      const board = game.getBoard();

      for (const pattern of WIN_PATTERNS) {
         const isWin = pattern.every((idx) => board[idx] === player.value);
         if (isWin) return true;
      }

      return false;
   }

   function isTie() {
      // add another conditon pattern
      const emptySlots = game.getBoard().filter((v) => v === "");
      return emptySlots.length === 1;
   }

   function resetBoard() {
      game.setBoard(["", "", "", "", "", "", "", "", ""]);
      elements.slots.forEach((slot) => slot.classList.remove("x", "o"));
      filledSlots = [];
   }

   const winner = getWinner(player);

   console.log(game.getBoard());
   if (winner) {
      const winningPlayer = player;
      setTimeout(() => {
         alert(winningPlayer);
         currentPlayer = players[0];
         updateScore(player);
         console.log("----------");
         resetBoard();
      }, 300);
      return true;
   }

   if (isTie()) {
      setTimeout(() => {
         alert("Tie");
         currentPlayer = players[0];
         console.log("----------");
         resetBoard();
      }, 300);
      return true;
   }

   return false;
}
