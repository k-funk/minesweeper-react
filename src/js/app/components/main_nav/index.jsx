import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes as T } from 'prop-types';
import classNames from 'classnames';


export default class MainNav extends PureComponent {
  static propTypes = {
    className: T.string,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { className } = this.props;
    return (
      <div className={classNames(className, 'header')}>
        <Link to="/"><span className="fas fa-home" /></Link>
      </div>

    );
  }
}
