import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class DefLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <Header />
        { children }
      </>
    );
  }
}

DefLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefLayout;
