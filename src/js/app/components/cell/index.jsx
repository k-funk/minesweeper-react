import React from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import { GAME_STATUS } from 'app/constants';


const StyledCellButton = styled.button`
  background-color: ${({ gameStatus, isRevealed, isFlagged, isMine, exploded }) => {
    if (exploded) {
      return '#ff5d5d';
    }

    if (gameStatus === GAME_STATUS.LOST && isFlagged && !isMine) {
      return '#ffcfcf';
    }

    if (isRevealed) {
      return '#eee';
    }

    return '#aaa';
  }};
  height: 35px;
  width: 35px;
  border: 1px solid transparent;
  font-weight: bold;
  font-size: 1.2rem;
  user-select: none;
  padding: 0;
  background-clip: padding-box;
  
  ${({ isRevealed }) => (!isRevealed && `
    &:hover {
      background-color: #ddd;
    }
  `)}
  
  ${({ isRevealed }) => (isRevealed && `
    box-shadow: inset 2px 2px 4px 0px rgba(0,0,0,0.2);
  `)}
  
  &:focus {
    outline: none;
  }
`;

export const neighborsColorMap = {
  0: 'transparent',
  1: 'blue',
  2: 'green',
  3: 'red',
  4: 'purple',
  5: 'maroon',
  6: 'turquoise',
  7: 'black',
  8: 'gray',
};


export const getSymbol = (cellData, gameStatus) => {
  const { isFlagged, isRevealed, isMine, neighbors } = cellData;
  if (
    (isFlagged && gameStatus !== GAME_STATUS.LOST) ||
    (isFlagged && gameStatus && isMine === true) // they incorrectly flagged the tile
  ) {
    return <span role="img" aria-label="Flags Remaining">🚩</span>;
  }

  if (isRevealed) {
    if (isMine) {
      return <span role="img" aria-label="Flags Remaining">💣</span>;
    }
    return <span style={{ color: neighborsColorMap[neighbors] }}>{neighbors}</span>;
  }

  return ' ';
};

export default function Cell({ className, cellData, onClick, onContextMenu, gameStatus }) {
  const { isRevealed, isMine, isFlagged, exploded } = cellData;
  return (
    <StyledCellButton
      className={classNames(className)}
      type="button"
      onClick={() => onClick(cellData)}
      onContextMenu={event => onContextMenu(event, cellData)}
      isRevealed={isRevealed}
      isMine={isMine}
      isFlagged={isFlagged}
      gameStatus={gameStatus}
      exploded={exploded}
    >
      {getSymbol(cellData, gameStatus)}
    </StyledCellButton>
  );
}

Cell.propTypes = {
  className: T.string,
  cellData: T.object.isRequired,
  onClick: T.func.isRequired,
  onContextMenu: T.func.isRequired,
  gameStatus: T.string.isRequired,
};
