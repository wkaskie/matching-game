import React from 'react';
import { Card } from '../Card/Card';
import './Board.scss';

const Board = () => {
  return (
    <div className="Board">
      {[1, 2, 3, 4, 5].map((val, indx) => (
        <Card key={indx}
          className="Board__card"></Card>
      ))}
    </div>
  );
};

export default Board;
