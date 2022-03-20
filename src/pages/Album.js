import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { Loading, MusicCard, CheckBox } from '../components/index1';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      collectionName: '',
      artistName: '',
      image: '',
      loading: false,
      isMounted: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    }, () => {
      this.getMusicsFromAlbum();
      this.getFavorites();
    });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  getMusicsFromAlbum = async () => {
    const { isMounted } = this.state;
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    if (isMounted) {
      const musics = await getMusics(id);
      this.setState({
        musics,
        collectionName: musics[0].collectionName,
        artistName: musics[0].artistName,
        image: musics[0].artworkUrl100,
        loading: false,
      });
    }
  }

  handleChange = ({ target: { checked: isChecked } }, music) => {
    this.setState({ loading: true });
    if (isChecked) {
      this.addSongs(music);
    } else {
      this.removeSongs(music);
    }
  }

  addSongs = async (music) => {
    await addSong(music);
    const favoriteMusics = await getFavoriteSongs();
    this.setState({
      favorites: favoriteMusics,
    }, () => this.setState({ loading: false }));
  }

  removeSongs = async (music) => {
    const { favorites } = this.state;
    await removeSong(music);
    this.setState({
      favorites: favorites.filter((fav) => fav.trackId !== music.trackId),
    }, () => this.setState({ loading: false }));
  }

  getFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  render() {
    const { musics, collectionName, artistName, image, loading, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <div>
          <div>
            <img src={ image } alt={ `${collectionName} / ${artistName}` } />
            <h3 data-testid="album-name">{collectionName}</h3>
            <p data-testid="artist-name">{artistName}</p>
          </div>
          {loading ? <Loading /> : (
            <div>
              {musics.map((music, index) => {
                if (index !== 0) {
                  return (
                    <div key={ music.trackId }>
                      <MusicCard
                        trackName={ music.trackName }
                        previewUrl={ music.previewUrl }
                        trackId={ music.trackId }
                      />
                      {loading ? <Loading /> : (
                        <CheckBox
                          trackId={ music.trackId }
                          checked={ favorites
                            .some((favorite) => favorite.trackId === music.trackId) }
                          onChange={ (e) => this.handleChange(e, music) }
                        />
                      )}
                    </div>
                  );
                }
                return undefined;
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
