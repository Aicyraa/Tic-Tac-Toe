import '../../css/Arena.css';
import { useState } from 'react';

import Board from './Board';
import Score from './Score';
import Scoreboard from './ScoreBoard';

function Arena({ config, setConfig }) {
   // Board
   // Scores
   // Score Board
   // Restart Board

   const [turn, setTurn] = useState(0);
   const [playersStatus, setPlayersStatys] = useState({
      x: { name: config.playerX, score: 0 },
      o: { name: config.playerO, score: 0 },
   });

   return (
      <div className='arena'>
         <Score players={playersStatus} />
         <Board players={playersStatus} />
      </div>
   );
}

export default Arena;
