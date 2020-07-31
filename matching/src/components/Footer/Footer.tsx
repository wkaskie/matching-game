import * as React from 'react';
import './Footer.scss';

interface Props {
    onNewGame: () => void;
}
export const Footer = ({ onNewGame }: Props) => {
    const handleNewGameClick = () => {
        onNewGame();
    }

    return (
        <div className="Footer">
            <div className="Footer__button button" onClick={handleNewGameClick}>
                Start New Game
            </div>
        </div>
    )
}