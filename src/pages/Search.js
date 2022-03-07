import React, { Component } from 'react';

const MIN_LENGTH = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isBtnDisabled: true,
    };
  }

  handleChange = ({ target: { value } }) => {
    const INPUT_LENGTH = value.length;
    this.setState({
      isBtnDisabled: INPUT_LENGTH < MIN_LENGTH,
    });
  }

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <input
          name="artistName"
          id="artistName"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          onChange={ this.handleChange }
        />
        <button
          name="searchBtn"
          type="button"
          data-testid="search-artist-button"
          disabled={ isBtnDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
