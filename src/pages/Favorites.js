import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { Loading, MusicCard, CheckBox } from '../components';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: true,
      isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true }, () => {
      this.getFavorites();
    });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  handleChange = ({ target: { checked: isChecked } }, music) => {
    this.setState({ loading: true });
    if (!isChecked) {
      this.removeSongs(music);
    }
  }

  removeSongs = async (music) => {
    const { favorites } = this.state;
    await removeSong(music);
    this.setState({
      favorites: favorites.filter((fav) => fav.trackId !== music.trackId),
    }, () => this.setState({ loading: false }));
  }

  getFavorites = async () => {
    const { isMounted } = this.state;
    if (isMounted) {
      const favorites = await getFavoriteSongs();
      this.setState({ loading: false, favorites });
    }
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        {loading ? <Loading /> : (
          favorites.map((fav) => (
            <div key={ fav.trackId }>
              <MusicCard
                trackName={ fav.trackName }
                previewUrl={ fav.previewUrl }
              />
              {loading ? <Loading /> : (
                <CheckBox
                  trackId={ fav.trackId }
                  checked={ favorites
                    .some(({ trackId }) => fav.trackId === trackId) }
                  onChange={ (e) => this.handleChange(e, fav) }
                />
              )}
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
