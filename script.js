const game = (function () {
   const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
   const getBoard = () => board;
   const checkSlot = (idx) => board[idx] == 0 ? true : false;
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
         value: 1
      },
      {
         name: oponent,
         value: 2
      },
   ]
}

function slotHandler(){
   return function (event){
      const target = event.target;
      const index = target.getAttribute("index");

      if (game.checkSlot(index)) {
         game.setSlot(index, currentPlayer);
         currentPlayer = game.switchPlayer(players, currentPlayer);
      }

      console.log(game.getBoard()); // logger
   }
}

// clickable slot in the 3b3
// put element in the clicked slot
// sync it with the back end 


