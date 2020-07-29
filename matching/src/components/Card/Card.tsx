import React, { useState } from 'react';
import classNames from 'classnames';
import './Card.scss';

export interface Props {
    className: string;
    cardFrontImg?: string;
    cardBackImg?: string;
}

export const Card = ({className, cardFrontImg = 'cards.jpg', cardBackImg = 'cards.jpg'}: Props) => {
    const [visible, setVisible] = useState(false);
    const flipCard = () => {
        console.log('flipping');
        setVisible(!visible);
    }

    return (
        <div className={classNames(className, 'Card', {'Card__selected': visible})} onClick={flipCard}>
            <div className="Card_face">
                {<img className="Card__image" src={visible ? cardFrontImg : cardBackImg} alt="playing card" />}
            </div>
        </div>
    );
};