import '../css/Menu.css'

function Menu({ config, setConfig }) {
   return (
      <div className='menu'>
         <h2> Tic Tac Toe </h2>
         <div className='options'>
            <button
               className='option option-1'
               onClick={() =>
                  setConfig({ ...config, isPlaying: true, mode: 'bot' })
               }>
               Vs Bot
            </button>
            <button
               className='option option-2'
               onClick={() =>
                  setConfig({ ...config, isPlaying: true, mode: 'human' })
               }>
               2 Players
            </button>
         </div>
      </div>
   );
}

export default Menu;
