import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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

  callAddSongFromFavoriteSongsAPI = async ({ target: { id, checked } }) => {
    this.setState({ loading: true });
    if (checked) {
      console.log('text', checked);
      await addSong(id);
      this.callFavoriteSongsFromFavoriteSongs();
    /*       this.setState({
        loading: false,
        checked: true,
      }); */
    } else {
      await removeSong(id);
      console.log('removeu');
      this.callFavoriteSongsFromFavoriteSongs();
    /*       this.setState({
        loading: false,
        checked: false,
      }); */
    }
    this.callFavoriteSongsFromFavoriteSongs();
  }

  render() {
    const { musics } = this.props;
    const { trackName, previewUrl, trackId } = musics;
    const { loading, favorites } = this.state;
    const loadingTime = <span>Carregando...</span>;
    // console.log(typeof parseInt(favorites[0], 10));
    if (loading) {
      return loadingTime;
    }
    const favoriteOrNot = favorites.some((song) => parseInt(song, 10) === musics.trackId);
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {/* { loading
          ? loadingTime
          : ( */}
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            name="favorite"
            type="checkbox"
            id={ trackId }
            onChange={ this.callAddSongFromFavoriteSongsAPI }
            checked={ favoriteOrNot }
          />
        </label>
        {/*           )} */}
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
