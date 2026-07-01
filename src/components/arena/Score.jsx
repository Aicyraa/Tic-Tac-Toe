import React from 'react';

function Score({ players }) {
   return (
      <div className='arena-score'>
         <div className='players player-1'>
            <span> {players.x.name} </span>
            <h2> {players.x.score} </h2>
         </div>
         <div className='players player-2'>
            <span> {players.o.name} </span>
            <h2> {players.o.score} </h2>
         </div>
      </div>
   );
}

export default Score;
