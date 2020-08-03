import React from 'react';
import { SocketTest } from "./components/websocket";
import Game from './components/Game'
import './App.css';

function App() {
  return (
    <div className="App">
    <SocketTest></SocketTest>
      <Game></Game>
    </div>
  );
}
export default App;
