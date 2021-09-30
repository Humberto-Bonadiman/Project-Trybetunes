import React from 'react';
import PropTypes from 'prop-types';

class InputName extends React.Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <label htmlFor="name" className="label-login">
        Nome:
        <input
          type="text"
          name="name"
          onChange={ onChange }
          value={ value }
          data-testid="login-name-input"
          className="input-login"
        />
      </label>
    );
  }
}

InputName.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputName;
