import * as React from 'react';
import './Footer.scss';

interface Props {
  self: number;
  gameInProgress: boolean;
  onNewGame: () => void;
}
export const Footer = ({ self, gameInProgress, onNewGame }: Props) => {
  const handleNewGameClick = () => {
    onNewGame();
  };

  return (
    <div className="Footer">
      {self === 1 && (
        <div
          className="Footer__button button"
          onClick={() => handleNewGameClick()}
        >
          Start New Game
        </div>
      )}
      {self !== 1 && !gameInProgress && (
          <p>Waiting for player 1 to start the game</p>
      )}
    </div>
  );
};
