import * as React from "react";
import { Header } from "../Header/Header";
import Board from "../Board/Board";
import gamePlay from "../../services/gamePlay";
import { ScoreKeeper } from "../ScoreKeeper/ScoreKeeper";
import "./Game.scss";
import { Footer } from "../Footer/Footer";

export const Game = () => {
  const cards = gamePlay.newGame();
  const [players, setPlayers] = React.useState(gamePlay.players);
  return (
    <div className="Game">
      <Header></Header>
      <ScoreKeeper players={players}></ScoreKeeper>
      <div className="Game__body">
        <Board cardGrid={cards}></Board>
      </div>
      <Footer></Footer>
    </div>
  );
};
