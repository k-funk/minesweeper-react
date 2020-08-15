import React from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';

import Board from 'app/components/board';


export const GAME_STATUS = {
  NOT_STARTED: 'notStarted',
  LOST: 'lost',
  WON: 'won',
  IN_PROGRESS: 'inProgress',
};

export default function MainPage({ className }) {
  return (
    <div className={classNames(className)}>
      <div>
        {GAME_STATUS.NOT_STARTED}
      </div>
      <div>
        Mines Left/flags left to place: 0 FIXME
      </div>
      {/* TODO: get this info from the user */}
      <Board width={4} height={4} mines={2} />
    </div>
  );
}

MainPage.propTypes = {
  className: T.string,
};
