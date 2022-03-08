import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

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
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    },
    () => {
      this.getMusicsFromAlbum();
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

  render() {
    const { musics, collectionName, artistName, image, loading } = this.state;
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
              {musics.map(({ trackId, trackName, previewUrl }, index) => {
                if (index !== 0) {
                  return (
                    <div key={ trackId }>
                      <MusicCard
                        trackName={ trackName }
                        previewUrl={ previewUrl }
                        trackId={ trackId }
                      />
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
