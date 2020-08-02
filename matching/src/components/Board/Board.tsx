import React from 'react';
import { Card, CardDataType } from '../Card/Card';
import './Board.scss';

export interface Props {
  cardGrid: CardDataType[];
  currentPlayer: number;
  theWinner?: number;
  onCardClicked: (card: CardDataType, visibilityState: boolean) => void;
}

const Board = ({ cardGrid, currentPlayer, onCardClicked, theWinner }: Props) => {
  const handleCardClick = (card: CardDataType, visibilityState: boolean) => {
    onCardClicked(card, visibilityState );
  };

  return (
    <div className="Board">
      {cardGrid.length > 0 && <h3 className="Board__subtitle">Your turn Player {currentPlayer}</h3>}
      {cardGrid.map((val, indx) => (
        <Card
          key={indx}
          className="Board__card card"
          card={val}
          isVisible={val.isVisible}
          onClick={(visibility) => handleCardClick(val, visibility)}
        ></Card>
      ))}
      {!!theWinner && (
        <div className="Board__winner-announcement">
          <h2>Congratulations Player {currentPlayer}</h2>
        </div>
      )}
    </div>
  );
};

export default Board;
