import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      loading: false,
    };
  }

  handleChange = async ({ target: { checked: isChecked } }) => {
    this.setState({
      isChecked,
      loading: true,
    });
    const { trackId } = this.props;
    const musics = await getMusics(trackId);
    const favoriteMusic = await addSong(musics);
    if (favoriteMusic) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { isChecked, loading } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ `${trackId}` }>
              <input
                type="checkbox"
                id={ `${trackId}` }
                data-testid={ `checkbox-music-${trackId}` }
                checked={ isChecked }
                onChange={ this.handleChange }
              />
              Favorita
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
