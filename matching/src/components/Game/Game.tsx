import React, { useState } from 'react';
import { Header } from '../Header/Header';
import Board from '../Board/Board';
import gamePlay from '../../services/gamePlay';
import { ScoreKeeper } from '../ScoreKeeper/ScoreKeeper';
import { Footer } from '../Footer/Footer';
import { Player } from '../ScoreKeeper/PlayerScore';
import './Game.scss';

export const Game = () => {
  const [cards, setCards] = useState(gamePlay.newGame());
  const [players, setPlayers] = React.useState<Player[]>(gamePlay.players);
  const [currentPlayer, setCurrentPlayer] = useState<number>(gamePlay.nextTurn());

  const handlePlayerChange = () => {
    setCurrentPlayer(gamePlay.nextTurn());
  }
 
  const handleIncrementScore = () => {
    const updatedPlayers = [...players];
    const playerInTheList = updatedPlayers.find(player => player.name === currentPlayer);
    if(playerInTheList) ++playerInTheList.score; // the if statement is to make TS happy
    setPlayers(updatedPlayers);
  }

  return (
    <div className="Game">
      <Header></Header>
      <div className="Game__scorekeeper">
        <ScoreKeeper currentPlayer={currentPlayer} players={players}></ScoreKeeper>
      </div>
      <div className="Game__body">
        <Board cardGrid={cards} currentPlayer={currentPlayer} onPlayerChange={handlePlayerChange} onScoreIncrement={handleIncrementScore}></Board>
      </div>
      <Footer onNewGame={() => setCards(gamePlay.newGame())}></Footer>
    </div>
  );
};
