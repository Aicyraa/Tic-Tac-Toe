import { useState } from 'react';
import './css/App.css';

import Menu from './components/Menu';
import NameField from './components/NameField';
import Arena from './components/arena/Arena';

function App() {
   const [config, setConfig] = useState({
      mode: null,
      playerX: '',
      playerO: '',
   });

   if (!config.isPlaying) {
      return <Menu setConfig={setConfig} />;
   }

   if (config.isPlaying && !config.playerX) {
      return <NameField config={config} setConfig={setConfig} />;
   }

   return <Arena config={config} setConfig={setConfig} />;
}

export default App;
