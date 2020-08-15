import React, { useState } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import Cell from 'app/components/cell';


const StyledRow = styled.div`
  display: flex;
`;


export const makeBoard2DArray = (width, height) => (
  new Array(width).fill(new Array(height).fill({
    isMine: false,
    isRevealed: false,
    isFlagged: false,
    neighbors: 0,
  }))
);

export const plantMines = (board, mines) => {

};

export const setNeighbors = board => {

};

export const revealAllCells = board => {
  board.forEach(row => row.forEach(cell => {
    cell.isRevealed = true;
  }));
};

export const initBoardData = (width, height, mines) => {
  const board = makeBoard2DArray(width, height);
  plantMines(board, mines);
  setNeighbors(board);
  return board;
};


export default function Board({ className, width, height, mines }) {
  const [board, setBoard] = useState(initBoardData(width, height, mines));

  const onClickCell = cellData => {
    console.log('cell clicked');
  };

  return (
    <div className={classNames(className)}>
      {board.map((row, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledRow key={`row-${i}`}>
          {row.map((col, j) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cell key={`cell-${i},${j}`} cellData={col} onClick={onClickCell} />
          ))}
        </StyledRow>
      ))}
    </div>
  );
}

Board.propTypes = {
  className: T.string,
  width: T.number.isRequired,
  height: T.number.isRequired,
  mines: T.number.isRequired,
};
