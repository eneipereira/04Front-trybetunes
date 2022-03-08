import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

const MIN_LENGTH = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      search: '',
      isBtnDisabled: true,
      loading: false,
      isMounted: false,
      isAlbumRequested: false,
      albuns: [],
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  handleChange = ({ target: { value } }) => {
    const INPUT_LENGTH = value.length;
    this.setState({
      search: value,
      isBtnDisabled: INPUT_LENGTH < MIN_LENGTH,
    });
  }

  handleClick = async () => {
    const { search, isMounted } = this.state;
    this.setState({
      search: '',
      artistName: search,
      loading: true,
      isBtnDisabled: true,
    });
    if (isMounted) {
      const album = await searchAlbumsAPI(search);
      this.setState({
        loading: false,
        albuns: album,
        isAlbumRequested: true,
      });
    }
  }

  render() {
    const {
      search,
      isBtnDisabled,
      artistName,
      loading,
      isAlbumRequested,
      albuns,
    } = this.state;
    return (
      <div data-testid="page-search">
        {loading ? <Loading /> : (
          <form>
            <input
              type="text"
              name="artistName"
              id="artistName"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              onChange={ this.handleChange }
              value={ search }
            />
            <button
              name="searchBtn"
              type="button"
              data-testid="search-artist-button"
              disabled={ isBtnDisabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
        )}
        {isAlbumRequested && !albuns.length && (
          <h2>Nenhum álbum foi encontrado</h2>
        )}
        {isAlbumRequested && albuns.length !== 0 && (
          <section>
            <h2>{`Resultado de álbuns de: ${artistName}`}</h2>
            <ul>
              {albuns.map((
                { artistName: Name, collectionId, collectionName, artworkUrl100 },
              ) => (
                <li key={ collectionId }>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    <img
                      src={ artworkUrl100 }
                      alt={ `${collectionName} / ${Name} ` }
                    />
                    <h3>{collectionName}</h3>
                    <p>{Name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }
}

export default Search;
