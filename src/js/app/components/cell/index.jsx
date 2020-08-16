import React from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';


const StyledCellButton = styled.button`
  background: #eee;
  height: 40px;
  width: 40px;
  border: 1px solid #fff;
  
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

export default function Cell({ className, cellData, onClick }) {
  return (
    <StyledCellButton
      className={classNames(className)}
      type="button"
      onClick={() => onClick(cellData)}
    >
      {getSymbol(cellData)}
    </StyledCellButton>
  );
}

Cell.propTypes = {
  className: T.string,
  cellData: T.object.isRequired,
  onClick: T.func.isRequired,
};
