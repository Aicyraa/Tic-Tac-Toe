import { useState } from 'react';
import './css/App.css';

import Menu from './components/Menu';
import NameField from './components/NameBoard';
import Arena from './components/arena/Arena';

function App() {
   // Front Page the ask for user name if name doesnt exist]
   // Store scores as local storage
   // Player can change name then it is treated as another player record
   // 2 Scoreboard (For vs bot and 2 players) with names and scores.
   // Bot and 2 players . Implement minimax algorithm

   const [config, setConfig] = useState({
      isPlaying: false,
      mode: null,
      name: '',
   });

   if (!config.isPlaying) {
      return <Menu config={config} setConfig={setConfig} />;
   }

   if (config.isPlaying && !config.name) {
      return <NameField config={config} setConfig={setConfig} />;
   }

   return <Arena config={config} setConfig={setConfig} />;
}

export default App;
