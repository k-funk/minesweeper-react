import React from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';


const StyledCellButton = styled.button`
  background-color: #eee;
  height: 50px;
  width: 50px;
  border: 1px solid #fff;
  
  &:hover {
    background-color: #ddd;
  }
  
  &:focus {
    outline: none;
  }
`;


export const getSymbol = cellData => {
  if (cellData.isFlagged) {
    return 'f';
  }

  if (cellData.isRevealed) {
    if (cellData.isMine) {
      return 'm';
    }
    return cellData.neighbors;
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
