import React, { PureComponent } from 'react';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';


export default class Loader extends PureComponent {
  static propTypes = {
    className: T.string,
    loading: T.bool,
    small: T.bool,
  };

  static defaultProps = {
    className: '',
    loading: false,
    small: false,
  }

  render() {
    const { className, loading, small } = this.props;

    if (!loading) { return null; }

    return (
      <div className={classNames(className, 'spinner', { 'spinner-small': small })}>
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    );
  }
}
