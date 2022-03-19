import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckBox extends Component {
  render() {
    const { trackId, checked, onChange } = this.props;
    return (
      <label htmlFor={ `${trackId}` }>
        <input
          type="checkbox"
          id={ `${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
          checked={ checked }
          onChange={ onChange }
        />
        Favorita
      </label>
    );
  }
}

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  trackId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

CheckBox.defaultProps = {
  trackId: '',
};

export default CheckBox;
