import React from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default function DifficultySelector({ className, onSelect, options, currentDifficulty }) {
  return (
    <UncontrolledDropdown className={classNames(className)}>
      <DropdownToggle color="primary" caret>
        {currentDifficulty}
      </DropdownToggle>
      <DropdownMenu>
        {Object.entries(options).map(([key, val]) => (
          <DropdownItem
            key={key}
            onClick={() => onSelect(key)}
          >
            {val.readable}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

DifficultySelector.propTypes = {
  className: T.string,
  onSelect: T.func.isRequired,
  options: T.shape({
    readable: T.string,
    width: T.number,
    height: T.number,
    mines: T.number,
  }).isRequired,
  currentDifficulty: T.string.isRequired,
};
