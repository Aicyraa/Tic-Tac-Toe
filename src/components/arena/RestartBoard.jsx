import React from 'react';

function RestartBoard({ setGameStatus, setConfig }) {
   return (
      <div className='restart'>
         <button
            type='button'
            onClick={() =>
               setGameStatus(prev => ({
                  ...prev,
                  turn: 0,
                  logicBoard: Array(9).fill(''),
                  isRunning: true,
               }))
            }>
            Play Again?
         </button>
         <button
            type='button'
            onClick={() => setConfig(prev => ({ ...prev, isPlaying: false }))}>
            Menu
         </button>
      </div>
   );
}

export default RestartBoard;
