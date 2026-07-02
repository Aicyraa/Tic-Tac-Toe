const PATTERNS = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

function checkTie(board) {
   console.log('Tie Check: ' + board);
   return board.filter(cell => cell == '').length > 0 ? false : true;
}

function checkWinner(board, currentPlayer) {
   return PATTERNS.some(pattern =>
      pattern.every(index => board[index] === currentPlayer),
   );
}

// ====

function processBoard(board, currentPlayer) {
   if (checkWinner(board, currentPlayer)) return 1;
   else if (checkTie(board, currentPlayer)) return 0;
   else return -1;
}

function updateScore(playersStatus, setPlayersStatus, currentPlayer) {
   setPlayersStatus(prev => ({
      ...prev,
      [currentPlayer]: {
         ...prev[currentPlayer],
         score: (prev[currentPlayer]?.score || 0) + 1,
      },
   }));
}

export { processBoard, updateScore };
