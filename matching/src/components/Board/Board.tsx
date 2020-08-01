import React, { useState } from 'react';
import { Card, CardDataType } from '../Card/Card';
import game from '../../services/gamePlay';
import './Board.scss';

export interface Props {
  cardGrid: CardDataType[];
  currentPlayer: number;
  onPlayerChange: () => void;
  onScoreIncrement: () => void;
}

const Board = ({ cardGrid, currentPlayer, onPlayerChange, onScoreIncrement }: Props) => {
  const [grid, setGrid] = useState(cardGrid);
  // const [collecting, setCollecting] = useState(false); // "collect the cards when matches are found"
  // const [showNextButton, setShowNextButton] = useState(false); // hand over your turn
  const [winnerFound, setWinnerFound] = useState(false);

  const handleCardClick = (card: CardDataType, visibilityState: boolean) => {
    card.isVisible = visibilityState;
    setGrid([...grid]);
    const visibleCards = grid.filter((card) => card.isVisible);
    if (visibleCards.length === 2) {
      const cardsMatch = game.compareVisibleCards(visibleCards);
      if (cardsMatch) {
        // setCollecting(true);
        setTimeout(() => {
          handleCollectClick();
        }, 1000);
      } else {
        // setShowNextButton(true);
        setTimeout(() => {
          handleNextClick();
        }, 1000);
      }
    }
  };

  const handleNextClick = () => {
    grid
      .filter((card) => card.isVisible)
      .forEach((card) => (card.isVisible = false));
    // setShowNextButton(false);
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
      // setCollecting(false);
      setGrid([...grid]); // need to make
      onScoreIncrement();
    if(!grid.some(card => !card.isFound)) {
      setWinnerFound(true);
    };
  };

  return (
    <div className="Board">
      <h3 className="Board__subtitle">Your turn Player {currentPlayer}</h3>
      {grid.map((val, indx) => (
        <Card
          key={indx}
          className="Board__card card"
          card={val}
          isVisible={val.isVisible}
          onClick={(visibility) => handleCardClick(val, visibility)}
        ></Card>
      ))}
      {winnerFound && (
        <div className="Board__winner-announcement">
          <h2>Congratulations Player {currentPlayer}</h2>
        </div>
      )}
    </div>
  );
};

export default Board;
