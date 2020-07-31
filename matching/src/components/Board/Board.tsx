import React, { useState } from 'react';
import { Card, CardDataType } from '../Card/Card';
import game from '../../services/gamePlay';
import './Board.scss';

export interface Props {
  cardGrid: CardDataType[];
  currentPlayer: number;
  onPlayerChange: () => void;
}

const Board = ({ cardGrid, currentPlayer, onPlayerChange }: Props) => {
  const [grid, setGrid] = useState(cardGrid);
  const [collecting, setCollecting] = useState(false); // "collect the cards when matches are found"
  const [showNextButton, setShowNextButton] = useState(false); // hand over your turn

  const handleCardClick = (card: CardDataType, visibilityState: boolean) => {
    card.isVisible = visibilityState;
    setGrid([...grid]);
    const visibleCards = grid.filter((card) => card.isVisible);
    if (visibleCards.length === 2) {
      const cardsMatch = game.compareVisibleCards(visibleCards);
      if (cardsMatch) {
        setCollecting(true);
      } else {
        setShowNextButton(true);
      }
    }
  };

  const handleNextClick = () => {
    grid
      .filter((card) => card.isVisible)
      .forEach((card) => (card.isVisible = false));
    setShowNextButton(false);
    setGrid([...grid]); // need to make
    onPlayerChange();
  };

  const handleCollectClick = () => {
    grid
      .filter((card) => card.isVisible)
      .forEach((card) => {
        card.isVisible = false;
        card.isFound = true;
      });
      setCollecting(false);
      setGrid([...grid]); // need to make
  };

  return (
    <div className="Board">
      <p className="Board__subtitle">Your turn Player {currentPlayer}</p>
      {grid.map((val, indx) => (
        <Card
          key={indx}
          className="Board__card card"
          card={val}
          isVisible={val.isVisible}
          onClick={(visibility) => handleCardClick(val, visibility)}
        ></Card>
      ))}
      {collecting && (
        <div className="Board__modal">
          <button className="Board__modal--button" onClick={handleCollectClick}>
            Collect
          </button>
        </div>
      )}
      {showNextButton && (
        <div className="Board__modal">
          <div role="button" className="Board__modal--button" onClick={handleNextClick}>
            Next
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
