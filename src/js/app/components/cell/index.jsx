import React from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import { GAME_STATUS } from 'app/constants';


const StyledCellButton = styled.button`
  background-color: ${({ gameStatus, isRevealed, isFlagged, isMine }) => {
    if (gameStatus === GAME_STATUS.LOST && isFlagged && !isMine) {
      return '#ffcfcf';
    }

    if (isRevealed) {
      return '#eee';
    }

    return '#aaa';
  }};
  height: 40px;
  width: 40px;
  border: 1px solid #fff;
  font-weight: bold;
  font-size: 1.5rem;
  user-select: none;
  padding: 0;
  
  // unwrap this?
  &:hover {
    background-color: ${props => (props.isRevealed ? '' : '#ddd')};
  }
  
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
  const { isRevealed, isMine, isFlagged } = cellData;
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
