import { useEffect, useState } from 'react';
import { processBoard, updateScore } from '../../utils/gameUtils';

function Board({
   gameStatus,
   setGameStatus,
   playersStatus,
   setPlayersStatus,
   mode,
}) {
   function handleCellClick(index) {
      const currentPlayer = gameStatus.turn % 2 == 0 ? 'x' : 'o';

      if (gameStatus.logicBoard[index]) {
         return;
      }

      const updatedBoard = [...gameStatus.logicBoard];
      updatedBoard[index] = currentPlayer;
      const result = processBoard(updatedBoard, currentPlayer);

      setGameStatus(prev => ({
         ...prev,
         logicBoard: updatedBoard,
      }));

      if (result == 1) {
         updateScore(playersStatus, setPlayersStatus, currentPlayer);
         setGameStatus(prev => ({ ...prev, isRunning: false }));
         return;
      } else if (result == 0) {
         setGameStatus(prev => ({ ...prev, isRunning: false }));
         return;
      }

      setGameStatus(prev => ({
         ...prev,
         turn: prev.turn + 1,
      }));
   }

   return (
      <div className='arena-board'>
         {gameStatus.logicBoard.map((value, index) => (
            <button
               key={index}
               type='button'
               className={`cells cell-${index + 1}`}
               disabled={!gameStatus.isRunning}
               onClick={() => handleCellClick(index)}>
               {value}
            </button>
         ))}
      </div>
   );
}

export default Board;
