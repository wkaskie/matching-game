import React from 'react';
import './PlayerScore.scss';

export interface Player {
    name: number;
    score: number;
}

interface Props {
    player: Player;
}

export const PlayerScore = ({ player }: Props) => {
    return (
        <div className="PlayerScore">
            <p>Player {player.name}: {player.score} </p>
        </div>
    )
}