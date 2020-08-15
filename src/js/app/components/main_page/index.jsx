import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';

import Loader from 'app/components/loader';


export default class MainPage extends PureComponent {
  static propTypes = {
    className: T.string,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classNames(className)}>
        Hello World!
        <Loader loading />
      </div>
    );
  }
}
