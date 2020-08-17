import React from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import Cell from 'app/components/cell';


const StyledRow = styled.div`
  display: flex;
`;

export default function Board({ className, board, onCellClick, onCellContextMenu, gameStatus }) {
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
              onClick={onCellClick}
              onContextMenu={onCellContextMenu}
              gameStatus={gameStatus}
            />
          ))}
        </StyledRow>
      ))}
    </div>
  );
}

Board.propTypes = {
  className: T.string,
  board: T.arrayOf(
    T.arrayOf(
      T.shape({
        x: T.number,
        y: T.number,
        isMine: T.bool,
        isRevealed: T.bool,
        isFlagged: T.bool,
        neighbors: T.number,
      }),
    ),
  ),
  onCellClick: T.func.isRequired,
  onCellContextMenu: T.func.isRequired,
  gameStatus: T.string.isRequired,
};
