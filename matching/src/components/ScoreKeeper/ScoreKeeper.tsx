import React from "react";
import "./ScoreKeeper.scss";
import { PlayerScore, Player } from "./PlayerScore";

interface Props {
  players: Player[];
}

export const ScoreKeeper = ({ players }: Props) => {
  return (
    <div className="ScoreKeeper">
      {players.map((player) => (
        <PlayerScore player={player}></PlayerScore>
      ))}
    </div>
  );
};
