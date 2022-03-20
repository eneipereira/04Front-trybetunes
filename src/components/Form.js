import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const {
      name,
      email,
      description,
      image,
      handleChange,
      handleSubmit,
      btnDisabled,
    } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="edit-input-name"
          name="name"
          placeholder="Insira um nome"
          value={ name }
          onChange={ handleChange }
        />
        <input
          type="text"
          data-testid="edit-input-email"
          name="email"
          placeholder="exemplo@exemplo.com"
          value={ email }
          onChange={ handleChange }
        />
        <textarea
          data-testid="edit-input-description"
          name="description"
          placeholder="Sobre mim"
          value={ description }
          onChange={ handleChange }
        />
        <input
          type="text"
          data-testid="edit-input-image"
          name="image"
          placeholder="Insira um link"
          value={ image }
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ btnDisabled }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  btnDisabled: PropTypes.bool.isRequired,
};

export default Form;
