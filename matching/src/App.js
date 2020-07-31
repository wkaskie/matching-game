import React from 'react';
import Board from './components/Board/Board';
import game from './services/gamePlay';
import './App.css';

function App() {
  const cards = game.newGame();
  return (
    <div className="App">
      <Board cardGrid={cards}></Board>
    </div>
  );
}

export default App;
