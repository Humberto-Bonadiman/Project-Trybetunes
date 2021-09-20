import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  callAddSongFromFavoriteSongsAPI = async ({ target: { id, checked } }) => {
    this.setState({ loading: true });
    if (checked) {
      await addSong(id);
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      await removeSong(id);
      this.setState({
        loading: false,
        checked: false,
      });
    }
  }

  render() {
    const { musics } = this.props;
    const { trackName, previewUrl, trackId } = musics;
    const { loading, checked } = this.state;
    const loadingTime = <span>Carregando...</span>;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        { loading
          ? loadingTime
          : (
            <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
              <p>Favorito</p>
              <input
                name="favorite"
                type="checkbox"
                id={ trackId }
                onChange={ this.callAddSongFromFavoriteSongsAPI }
                checked={ checked }
              />
            </label>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
