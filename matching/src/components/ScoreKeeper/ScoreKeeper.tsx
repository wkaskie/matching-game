import React from "react";
import { PlayerScore, Player } from "./PlayerScore";
import classNames from "classnames";
import "./ScoreKeeper.scss";

interface Props {
  players: Player[];
  currentPlayer: number;
}

export const ScoreKeeper = ({ players, currentPlayer }: Props) => {
  return (
    <div className="ScoreKeeper">
      {players.length === 0 && 
        <div className="ScoreKeeper__instructions">
          <p>Please start a game to see current players</p>
        </div>
      }
      {players.map((player) => (
        <div key={player.name} className={classNames("ScoreKeeper__player",{'ScoreKeeper__player--playing': currentPlayer === player.name})}>
        <PlayerScore player={player}></PlayerScore></div>
      ))}
    </div>
  );
};
