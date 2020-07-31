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
      {players.map((player) => (
        <div key={player.name} className={classNames("ScoreKeeper__player",{'ScoreKeeper__player--playing': currentPlayer === player.name})}>
        <PlayerScore player={player}></PlayerScore></div>
      ))}
    </div>
  );
};
