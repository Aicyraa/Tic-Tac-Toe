const gameBoard = (function () {
   
   const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
   const getBoard = () => board;
   const resetBoard = () => board.fill(0);

   function boardDisplay() {
      let row = 1
      board.forEach((__, index) => {
         if ([2, 5, 8].includes(index)) {
            console.log(`${row++}: ` + board[index - 2], board[index - 1], board[index]);
         }
      });
   }

 
   function setCell(index, player) {
      console.log(index, player);
      if (board[index] == 0) { 
         board[index] = player.value
       }
   } 

   return {getBoard, resetBoard, setCell, boardDisplay };

})();

function initializePlayer(player = "Jee", oponent = "AI") {
   return [
      {
         name: player,
         value: 1,
      },
      {
         name: oponent,
         value: 2,
      },
   ];
}

function gameplay() {
   function round(player) {
      console.log(`======== ${roundCount++} ========`);
      if (player) console.log(`Turn: ${player.name}`);
   }

   function setValue(index) { 
      round(currentPlayer);
      gameBoard.setCell(index, currentPlayer); // issue
      
      if (determineWinner(currentPlayer)) {
         console.log("Winner: " + currentPlayer.name);
         gameBoard.resetBoard();
         return
      }

      currentPlayer = currentPlayer == players[1] ? players[0] : players[1];
   }

   const players = initializePlayer();
   let currentPlayer = players[0];
   let roundCount = 1;

   return { setValue };
}

function determineWinner(player) {
   const combination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];

   gameBoard.boardDisplay();
   
   for (let i = 0; i < combination.length; i++) {
      const pattern = gameBoard.getBoard().filter((v, index) => combination[i].includes(index))
      var winner = pattern.every(value => value == player.value);
      if (winner) { break }
   }

   return winner;
}

let game = gameplay();
game.setValue(0)
game.setValue(1)
game.setValue(3)
game.setValue(5)
game.setValue(6) // winning side

game.setValue(1)