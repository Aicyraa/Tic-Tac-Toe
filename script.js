const gameBoard = (function () {
   function boardCell() {
      let cellValue = 0;
      const addValue = (newValue) => (cellValue = newValue);
      const getValue = () => cellValue;
      return { addValue, getValue };
   }

   // ---- ---- Board
   const row = 3,
      column = 3;
   const board = [];

   for (let i = 0; i < row; i++) {
      board[i] = [];
      for (let j = 0; j < column; j++) {
         board[i].push(boardCell());
      }
   }

   function boardDisplay() {
      board.forEach((row) => {
         console.log(row.map((column) => column.getValue()));
      });
   }

   function setCell(rowIdx, colIdx, player) {
      const targetCell =
         board[rowIdx][colIdx].getValue() !== 0 ? false : board[rowIdx][colIdx];
      if (targetCell) {
         targetCell.addValue(player.value);
      }
   }

   return { setCell, boardDisplay };
})();

function initializePlayer(player = "Jee", oponent = "AI") {
   return [
      {
         name: player,
         symbol: "x",
         value: 1,
      },
      {
         name: oponent,
         symbol: "o",
         value: 2,
      },
   ];
}

function gameplay() {
   function round(player) {
      console.log(`======== ${roundCount++} ========`);
      if (player) console.log(`Turn: ${player.name}`);
   }

   function setValue(row, column) {
      round(currentPlayer);
      gameBoard.setCell(row, column, currentPlayer); // issue
      gameBoard.boardDisplay();
      currentPlayer = currentPlayer == players[1] ? players[0] : players[1];
   }

   const players = initializePlayer();
   let currentPlayer = players[0];
   let roundCount = 1;

   return { setValue };
}

// let game = gameplay();
// game.setValue(0, 1);
// game.setValue(1, 1);
// game.setValue(2, 1);
// game.setValue(2, 0);
// game.setValue(2, 1);
// game.setValue(0, 2);

function determineWinner() {
   // Check every row, column, and the 2 diagonal

   const winBoard = [
      [1, 1, 2],
      [1, 1, 1],
      [2, 1, 2],
   ];

   const rowL = winBoard.length;
   const colL = winBoard[0].length;

   function checkRow(gameBoard) {
      let board = gameBoard || winBoard;

      for (let i = 0; i < rowL; i++) {
         let isValid = true;
         for (let j = 0; j < colL; j++) {
            if (board[i][j] == 0) {
               isValid = false;
               break;
            }

            if (j !== colL - 1 && board[i][j] != board[i][j + 1]) {
               isValid = false;
               break;
            }
         }

         console.log(isValid);
      }
   }

   function checkColumn() {
      // iterates trough column each row
      let column = [];
      for (let i = 0; i < rowL; i++) {
         let row = [];
         for (let j = 0; j < colL; j++) {
            row.push(winBoard[j][i]);
         }
         column.push(row);
      }

      checkRow(column);
   }

   function checkDiagonal() {
      let diagonal = [];
      for (let i = 0; i < rowL; i++) {
         let row = [];
         row.push(winBoard[i][j]);
      }
   }

   checkRow();
   console.log("===");
   checkColumn();
   console.log("===");
   checkDiagonal();
}

determineWinner();
