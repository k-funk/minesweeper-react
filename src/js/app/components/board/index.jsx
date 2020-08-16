import React, { useState } from 'react';
import { PropTypes as T } from 'prop-types';
import { range, sampleSize } from 'lodash';
import classNames from 'classnames';
import styled from 'styled-components';

import Cell from 'app/components/cell';


const StyledRow = styled.div`
  display: flex;
`;


export const makeBoard2DArray = (width, height) => (
  [...new Array(width)].map(() => [...new Array(height)].map(() => ({
    isMine: false,
    isRevealed: false,
    isFlagged: false,
    neighbors: 0,
  })))
);

export const generateUniqueRandomInts = (amount, upperLimit) => {
  const possibleNums = range(upperLimit);
  return sampleSize(possibleNums, amount);
};

export const plantMine = (board, index) => {
  const width = board.length;
  const x = Math.floor(index / width);
  const y = index % width;
  board[x][y].isMine = true;
};

export const plantMines = (board, mines) => {
  const width = board.length;
  const height = board[0].length;
  const totalCells = width * height;

  // each int represents a mine's position if we were to flatten the 2d array into a single array
  // example: on a 2x2 board, the cell at x:0,y:1 == 2 (0-indexed)
  // _________
  // | o  o  |
  // | x  o  |
  // _________
  // this strategy ensures that we find unique places to put mines in a finite runtime
  const indexesOfMinesFlattened = generateUniqueRandomInts(mines, totalCells);

  // mark that cell as having a mine
  indexesOfMinesFlattened.forEach(index => {
    plantMine(board, index);
  });
};

export const getNeighbors = (board, x, y) => {
  const neighbors = [];
  const widthMaxIdx = board.length - 1;
  const heightMaxIdx = board[0].length - 1;

  // up
  if (y > 0) {
    neighbors.push(board[x][y - 1]);
  }

  // up+right
  if (y > 0 && x < widthMaxIdx) {
    neighbors.push(board[x + 1][y - 1]);
  }

  // right
  if (x < widthMaxIdx) {
    neighbors.push(board[x + 1][y]);
  }

  // down+right
  if (y < heightMaxIdx && x < widthMaxIdx) {
    neighbors.push(board[x + 1][y + 1]);
  }

  // down
  if (y < heightMaxIdx) {
    neighbors.push(board[x][y + 1]);
  }

  // down+left
  if (x > 0 && y < heightMaxIdx) {
    neighbors.push(board[x - 1][y + 1]);
  }

  // left
  if (x > 0) {
    neighbors.push(board[x - 1][y]);
  }

  // up+left
  if (x > 0 && y > 0) {
    neighbors.push(board[x - 1][y - 1]);
  }

  return neighbors;
};

export const setNeighbors = board => {
  board.forEach((row, rowIdx) => (
    row.forEach((cell, cellIdx) => {
      cell.neighbors = getNeighbors(board, rowIdx, cellIdx)
        .reduce((acc, neighborCell) => {
          if (neighborCell.isMine) { acc += 1; }
          return acc;
        }, 0);
    })
  ));
};

export const revealAllCells = board => {
  board.forEach(row => (
    row.forEach(cell => {
      cell.isRevealed = true;
    })
  ));
};

export const initBoardData = (width, height, mines) => {
  const board = makeBoard2DArray(width, height);
  plantMines(board, mines);
  setNeighbors(board);
  // revealAllCells(board); // FIXME: for debugging only
  return board;
};


export default function Board({ className, width, height, mines }) {
  const [board, setBoard] = useState(initBoardData(width, height, mines));

  const handleCellClick = cellData => {
    const { isFlagged, isMine } = cellData;
    if (!isFlagged && isMine) {
      revealAllCells(board);
      setBoard([...board]);
    }
  };

  const handleCellContextMenu = (event, cellData) => {
    event.preventDefault();
    const { isRevealed } = cellData;
    if (!isRevealed) {
      cellData.isFlagged = !cellData.isFlagged;
      // FIXME: need to update the total mines flagged
      setBoard([...board]);
    }
  };

  return (
    <div className={classNames(className)}>
      {board.map((row, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledRow key={`row-${i}`}>
          {row.map((cell, j) => (
            <Cell
              // eslint-disable-next-line react/no-array-index-key
              key={`cell-${i},${j}`}
              cellData={cell}
              onClick={handleCellClick}
              onContextMenu={handleCellContextMenu}
            />
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
