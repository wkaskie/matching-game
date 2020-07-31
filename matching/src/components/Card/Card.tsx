import React, { useState } from 'react';
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
  const [url] = useState(cardFrontImg); // not needed now, but in case we want to switch it

  const flipCard = () => {
    if (onClick) {
      onClick(!isVisible);
    }
  };

  let cardStyle = {
    backgroundImage: 'url(' + url + ')',
    backgroundPosition: `${xPos}% ${yPos}%`,
  };

  console.log(
    'Rendering card ' +
      card.id +
      ' cardObj: ' +
      card.isVisible
  );

  return (
    <div
      className={classNames(className, 'Card', { Card__found: card.isFound })}
      onClick={flipCard}
    >
      <div
        className={classNames('Card__face', { 'Card__face--back': !isVisible })}
        style={cardStyle}
      ></div>
    </div>
  );
};
