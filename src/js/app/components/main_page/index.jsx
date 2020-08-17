import React from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';

import Game from 'app/components/game';


export default function MainPage({ className }) {
  return (
    <div className={classNames(className, 'd-flex justify-content-center')}>
      <Game />
    </div>
  );
}

MainPage.propTypes = {
  className: T.string,
};
