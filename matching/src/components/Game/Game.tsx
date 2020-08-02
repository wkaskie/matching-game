import React, { useState, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { CardDataType } from '../Card/Card';
import { Header } from '../Header/Header';
import Board from '../Board/Board';
import gamePlay from '../../services/gamePlay';
import { ScoreKeeper } from '../ScoreKeeper/ScoreKeeper';
import { Footer } from '../Footer/Footer';
import GameStore, { stateType } from './GameStore';
import './Game.scss';

export const Game = () => {
  const [gameState, setGameState] = useState<stateType>(GameStore.initialState);

  useLayoutEffect(() => {
    GameStore.subscribeState(setGameState);
    GameStore.init();
  }, []);

  const handleCardClick = (card: CardDataType, visibilityState: boolean) => {
    gamePlay.handleCardClicked(card.uniqueId, visibilityState);
  };

  const handleNewGame = () => {
    gamePlay.newGame();
  };

  return (
    <div className="Game">
      <Header self={gameState.self}></Header>
      <div className="Game__scorekeeper">
        <ScoreKeeper
          currentPlayer={gameState.currentPlayer}
          players={gameState.players}
        ></ScoreKeeper>
      </div>
      <div className={classNames("Game__body", {"Game__body--no-click": gameState.self !== gameState.currentPlayer})}>
        <Board
          cardGrid={gameState.grid}
          currentPlayer={gameState.currentPlayer}
          theWinner={gameState.winner}
          onCardClicked={(c, v) => handleCardClick(c, v)}
        ></Board>
      </div>
      <Footer
        onNewGame={() => handleNewGame()}
        self={gameState.self}
        gameInProgress={gameState.grid.length > 0}
      ></Footer>
    </div>
  );
};
