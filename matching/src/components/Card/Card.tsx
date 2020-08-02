import React from 'react';
import classNames from 'classnames';
import './Card.scss';

export interface CardDataType {
  id: string;
  xPos: number;
  yPos: number;
  isVisible?: boolean;
  isFound?: boolean;
}

export interface Props {
  className: string;
  cardFrontImg?: string;
  cardBackImg?: string;
  card: CardDataType;
  onClick?: (isVisible: boolean) => void;
  isVisible?: boolean;
}

export const Card = ({
  className,
  cardFrontImg = 'cards.jpg',
  cardBackImg = '',
  card,
  onClick,
  isVisible,
}: Props) => {
  const { xPos, yPos } = card;

  const flipCard = () => {
    if (onClick) {
      onClick(!isVisible);
    }
  };

  let cardStyle = {
    backgroundImage: 'url(' + cardFrontImg + ')',
    backgroundPosition: `${xPos}% ${yPos}%`,
  };

  return (
    <div
      className={classNames(className, 'Card', { Card__found: card.isFound })}
      onClick={() => flipCard()}
    >
      <div
        className={classNames('Card__face', { 'Card__face--flipped': !isVisible })}
      >
        <div className="Card__face--back"></div>
        <div className="Card__face--front" style={cardStyle}></div>
      </div>
    </div>
  );
};
