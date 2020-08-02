import React, { useState, useLayoutEffect } from "react";
import { SocketTest } from "../websocket";
import { CardDataType } from "../Card/Card";
import { Header } from "../Header/Header";
import Board from "../Board/Board";
import gamePlay from "../../services/gamePlay";
import { ScoreKeeper } from "../ScoreKeeper/ScoreKeeper";
import { Footer } from "../Footer/Footer";
import GameStore, { stateType } from "./GameStore";
import "./Game.scss";

export const Game = () => {
  const [gameState, setGameState] = useState<stateType>(GameStore.initialState);

  useLayoutEffect(()=> {
    GameStore.subscribeState((setGameState));
    GameStore.init();
  },[]);

  const handleCardClick = (card: CardDataType, visibilityState: boolean) => {
    gamePlay.handleCardClicked(card, visibilityState);
  };

  const handleNewGame = () => {
    gamePlay.newGame();
  }

  return (
      <div className="Game">
        <SocketTest></SocketTest>
        <Header></Header>
        <div className="Game__scorekeeper">
          <ScoreKeeper
            currentPlayer={gameState.currentPlayer}
            players={gameState.players}
          ></ScoreKeeper>
        </div>
        <div className="Game__body">
          <Board
            cardGrid={gameState.grid}
            currentPlayer={gameState.currentPlayer}
            theWinner={gameState.winner}
            onCardClicked={(c, v) => handleCardClick(c, v)}
          ></Board>
        </div>
        <Footer onNewGame={() => handleNewGame()}></Footer>
      </div>
  );
};
