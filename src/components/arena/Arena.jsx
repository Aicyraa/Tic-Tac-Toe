import '../../css/Arena.css';
import { useState } from 'react';

import Board from './Board';
import Score from './Score';
import Scoreboard from './ScoreBoard';
import RestartBoard from './RestartBoard';

function Arena({ config, setConfig }) {
   const [gameStatus, setGameStatus] = useState({
      logicBoard: Array(9).fill(''),
      turn: 0,
      isRunning: true,
   });

   const [playersStatus, setPlayersStatus] = useState({
      x: { name: config.playerX, score: 0 },
      o: { name: config.playerO, score: 0 },
   });

   return (
      <div className='arena'>
         <Score players={playersStatus} />
         <Board
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            playersStatus={playersStatus}
            setPlayersStatus={setPlayersStatus}
            mode={config.mode}
         />

         {!gameStatus.isRunning && (
            <RestartBoard setGameStatus={setGameStatus} setConfig={setConfig} />
         )}
      </div>
   );
}

export default Arena;
