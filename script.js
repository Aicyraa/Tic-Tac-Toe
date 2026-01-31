const game = (function () {
   const board = ["", "", "", "", "", "", "", "", ""];
   const getBoard = () => board;
   const checkSlot = (idx) => board[idx] == "" ? true : false;
   const setSlot = (idx, player) => {board[idx] = player.value}; 
   const switchPlayer = (players, current) => current == players[0] ? players[1] : players[0];
   return {getBoard, checkSlot, setSlot, switchPlayer};
})();

const e = {
   slots: document.querySelectorAll(".cells"),
   startBtn: document.querySelector("#start"),
};

let currentPlayer = null;
let players = null;

(function() {
   e.startBtn.addEventListener("click", initializeGame);
   // reset and rematch btns
})();

// 

function initializeGame() {
   players = initializePlayers();
   currentPlayer = players[0];

   e.slots.forEach(slot => slot.addEventListener("click", slotHandler()), {once: true})
   // UI buttons logic below
}

function initializePlayers(player = "Jee", oponent = "AI") {
   return [
      {
         name: player,
         value: "x",
      },
      {
         name: oponent,
         value: "o",
      },
   ]
}

function slotHandler(){

   // switch to player 2 

   return function (event){
      const target = event.target;
      const index = target.getAttribute("index");
      
      if (game.checkSlot(index) && currentPlayer === players[0]) {
         game.setSlot(index, currentPlayer);
         target.classList.add(currentPlayer.value);
         currentPlayer = game.switchPlayer(players, currentPlayer);
      }

      if (currentPlayer === players[1]) {
         const target = AIhandler();
         target.classList.add(currentPlayer.value);
         currentPlayer = game.switchPlayer(players, currentPlayer)
      }


      console.log(game.getBoard()); // logger
   }
}

function AIhandler(){

   let nonEmptySlots = [];
   
   for(let i = 0; i < game.getBoard().length; i++) {
      var randomIdx = Math.floor(Math.random() * 9)
      if (nonEmptySlots.includes(randomIdx)) {continue}
      else if (!game.checkSlot(randomIdx)) {continue}
      else {game.setSlot(randomIdx, currentPlayer); break}
   }

   return document.querySelectorAll(".cells")[randomIdx]
}

function determineWinner(){
   
}

