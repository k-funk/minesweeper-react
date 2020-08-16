import React from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';


const StyledCellButton = styled.button`
  background-color: ${props => (props.isRevealed ? '#eee' : '#aaa')};
  height: 50px;
  width: 50px;
  border: 1px solid #fff;
  font-weight: bold;
  font-size: 1.5rem;
  user-select: none;
  padding: 0;
  
  &:hover {
    background-color: #ddd;
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


export const getSymbol = cellData => {
  const { isFlagged, isRevealed, isMine, neighbors } = cellData;
  if (isFlagged) {
    return 'f';
  }

  if (isRevealed) {
    if (isMine) {
      return 'm';
    }
    return <span style={{ color: neighborsColorMap[neighbors] }}>{neighbors}</span>;
  }

  return ' ';
};

export default function Cell({ className, cellData, onClick, onContextMenu }) {
  return (
    <StyledCellButton
      className={classNames(className)}
      type="button"
      onClick={() => onClick(cellData)}
      onContextMenu={event => onContextMenu(event, cellData)}
      isRevealed={cellData.isRevealed}
    >
      {getSymbol(cellData)}
    </StyledCellButton>
  );
}

Cell.propTypes = {
  className: T.string,
  cellData: T.object.isRequired,
  onClick: T.func.isRequired,
  onContextMenu: T.func.isRequired,
};
