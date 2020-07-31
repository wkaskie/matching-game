import * as React from 'react';
import { Header } from '../Header/Header';
import Board from '../Board/Board';
import gamePlay from '../../services/gamePlay';
import { ScoreKeeper } from '../ScoreKeeper/ScoreKeeper';
import { Footer } from '../Footer/Footer';
import './Game.scss';
import { useState } from 'react';

export const Game = () => {
  const cards = gamePlay.newGame();
  const [players, setPlayers] = React.useState(gamePlay.players);
  const [currentPlayer, setCurrentPlayer] = useState(gamePlay.nextTurn());

  const handlePlayerChange = () => {
    setCurrentPlayer(gamePlay.nextTurn());
  }

  return (
    <div className="Game">
      <Header></Header>
      <div className="Game__scorekeeper">
        <ScoreKeeper currentPlayer={currentPlayer} players={players}></ScoreKeeper>
      </div>
      <div className="Game__body">
        <Board cardGrid={cards} currentPlayer={currentPlayer} onPlayerChange={handlePlayerChange}></Board>
      </div>
      <Footer></Footer>
    </div>
  );
};
