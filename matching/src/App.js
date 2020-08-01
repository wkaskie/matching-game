import React from 'react';
import Game from './components/Game'
import './App.css';
import { SocketTest } from './components/websocket';

function App() {
  return (
    <div className="App">
      <SocketTest></SocketTest>
      <Game></Game>
    </div>
  );
}
export default App;
