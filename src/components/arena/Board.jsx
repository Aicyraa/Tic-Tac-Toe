import { useEffect, useState } from 'react';
import { processBoard, updateScore } from '../../utils/gameUtils';
import minimax from '../../utils/minimax';

function Board({
   gameStatus,
   setGameStatus,
   playersStatus,
   setPlayersStatus,
   mode,
}) {
   const [isBotPicking, setIsBotPicking] = useState(false);

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
      }

      if (result == 0) {
         setGameStatus(prev => ({ ...prev, isRunning: false }));
         return;
      }

      setGameStatus(prev => ({
         ...prev,
         turn: prev.turn + 1,
      }));

      if (mode == 'bot') {
         setIsBotPicking(true);  
      }
   }

   useEffect(() => {
      if (mode !== 'bot' || !isBotPicking) return;

      const timeoutId = setTimeout(() => {
         const targetIndex = minimax(gameStatus.logicBoard, 0, true);
         const updatedBoard = [...gameStatus.logicBoard];
         updatedBoard[targetIndex] = 'o';
         const result = processBoard(updatedBoard, 'o');

         setGameStatus(prev => ({
            ...prev,
            logicBoard: updatedBoard,
         }));

         if (result === 1) {
            updateScore(playersStatus, setPlayersStatus, 'o');
            setGameStatus(prev => ({ ...prev, isRunning: false }));
         } else if (result === 0) {
            setGameStatus(prev => ({ ...prev, isRunning: false }));
         } else {
            setGameStatus(prev => ({ ...prev, turn: prev.turn + 1 }));
         }

         setIsBotPicking(false);
      }, 1100);

      return () => clearTimeout(timeoutId);
   }, [
      gameStatus.logicBoard,
      isBotPicking,
      mode,
      playersStatus,
      setPlayersStatus,
      setGameStatus,
   ]);

   return (
      <div className='arena-board'>
         {gameStatus.logicBoard.map((value, index) => (
            <button
               key={index}
               type='button'
               className={`cells cell-${index + 1}`}
               disabled={!gameStatus.isRunning || isBotPicking}
               onClick={() => handleCellClick(index)}>
               {value}
            </button>
         ))}
      </div>
   );
}

export default Board;
