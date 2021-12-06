import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.callFavoriteSongsFromFavoriteSongs();
  }

  callFavoriteSongsFromFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favorites: favoriteSongs,
      loading: false,
    });
  }

  callAddSongFromFavoriteSongsAPI = async ({ target: { checked } }) => {
    const { musics } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(musics);
      this.callFavoriteSongsFromFavoriteSongs();
    } else {
      await removeSong(musics);
      this.callFavoriteSongsFromFavoriteSongs();
    }
    this.callFavoriteSongsFromFavoriteSongs();
  }

  render() {
    const { musics } = this.props;
    const { trackName, previewUrl, trackId } = musics;
    const { loading, favorites } = this.state;
    const loadingTime = <span>Carregando...</span>;
    const favoriteOrNot = favorites.some((song) => song.trackId === musics.trackId);
    return (
      <div className="music-card">
        <p>{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <br />
        { loading ? loadingTime : (
          <label
            htmlFor={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
          >
            {'Favorita '}
            <input
              name="favorite"
              type="checkbox"
              id={ trackId }
              onChange={ this.callAddSongFromFavoriteSongsAPI }
              checked={ favoriteOrNot }
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
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
