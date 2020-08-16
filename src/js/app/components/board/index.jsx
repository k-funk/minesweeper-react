import React, { useState } from 'react';
import { PropTypes as T } from 'prop-types';
import { range, sampleSize } from 'lodash';
import classNames from 'classnames';
import styled from 'styled-components';

import Cell from 'app/components/cell';


const StyledRow = styled.div`
  display: flex;
`;

export const isWon = (board, mines) => {
  let revealedTiles = 0;
  board.forEach(row => (
    row.forEach(cell => {
      if (cell.isRevealed) {
        revealedTiles += 1;
      }
    })
  ));

  return revealedTiles === (board.length * board[0].length) - mines;
};

export const makeBoard2DArray = (width, height) => (
  [...new Array(height)].map((_, x) => [...new Array(width)].map((__, y) => ({
    x,
    y,
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

export const plantMine = (board, flatIndex) => {
  const width = board[0].length;
  const x = Math.floor(flatIndex / width);
  const y = flatIndex % width;
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
  indexesOfMinesFlattened.forEach(flatIndex => {
    plantMine(board, flatIndex);
  });
};

export const getNeighbors = (board, cell) => {
  const { x, y } = cell;
  const neighbors = [];
  const xMaxIdx = board[0].length - 1;
  const yMaxIdx = board.length - 1;
  // const widthMaxIdx = board[0].length - 1;

  // up
  if (x > 0) {
    neighbors.push(board[x - 1][y]);
  }

  // up+right
  if (x > 0 && y < xMaxIdx) {
    neighbors.push(board[x - 1][y + 1]);
  }

  // right
  if (y < xMaxIdx) {
    neighbors.push(board[x][y + 1]);
  }

  // down+right
  if (x < yMaxIdx && y < xMaxIdx) {
    neighbors.push(board[x + 1][y + 1]);
  }

  // down
  if (x < yMaxIdx) {
    neighbors.push(board[x + 1][y]);
  }

  // down+left
  if (x < yMaxIdx && y > 0) {
    neighbors.push(board[x + 1][y - 1]);
  }

  // left
  if (y > 0) {
    neighbors.push(board[x][y - 1]);
  }

  // up+left
  if (x > 0 && y > 0) {
    neighbors.push(board[x - 1][y - 1]);
  }

  return neighbors;
};

export const setNeighbors = board => {
  board.forEach(row => (
    row.forEach(cell => {
      cell.neighbors = getNeighbors(board, cell)
        .reduce((acc, neighborCell) => {
          if (neighborCell.isMine) { acc += 1; }
          return acc;
        }, 0);
    })
  ));
};

export const revealNeighboringZeros = (board, cell) => {
  const neighborCells = getNeighbors(board, cell);
  neighborCells.forEach(neighborCell => {
    if (!neighborCell.isRevealed && !neighborCell.isMine) {
      neighborCell.isRevealed = true;
      if (neighborCell.neighbors === 0) {
        revealNeighboringZeros(board, neighborCell);
      }
    }
  });
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
  return board;
};


export default function Board({ className, width, height, mines }) {
  const [board, setBoard] = useState(() => initBoardData(width, height, mines));

  const rerenderBoard = () => {
    setBoard([...board]);
  };

  const handleCellClick = cellData => {
    const { isFlagged, isMine, neighbors } = cellData;

    // TODO: consider disabling clicks if game is won/lost
    if (isFlagged) { return; }

    if (isMine) {
      revealAllCells(board);
      rerenderBoard();
      // FIXME: tell the parent
      return;
    }

    cellData.isRevealed = true;

    if (neighbors === 0) {
      revealNeighboringZeros(board, cellData);
    }
    rerenderBoard();
  };

  const handleCellContextMenu = (event, cellData) => {
    event.preventDefault();
    const { isRevealed } = cellData;

    if (isRevealed) { return; }

    cellData.isFlagged = !cellData.isFlagged;

    if (cellData.isFlagged) {
      if (isWon(board, mines)) {
        // FIXME: tell the parent
      }
    }
    // FIXME: update the total mines flagged in parent
    rerenderBoard();
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
