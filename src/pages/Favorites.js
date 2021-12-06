import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Favorites.css';
import loadingImage from './images/loading.gif';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.callGetFavoriteFromFavoriteSongs();
  }

  componentDidUpdate() {
    this.callGetFavoriteFromFavoriteSongs();
  }

  callGetFavoriteFromFavoriteSongs = async () => {
    getFavoriteSongs()
      .then((response) => this.setState({
        favorites: response,
        loading: false,
      }));
  }

  // Nesta parte eu consultei o repositório do Luiz Gustavo
  // Fonte: https://github.com/tryber/sd-014-b-project-trybetunes/pull/42/commits/37e54f8371de73e9b5f9baaad852c297c303fa3b
  callRemoveSongs = (musics) => {
    this.setState({ loading: true }, async () => {
      await removeSong(musics)
        .then(() => this.callGetFavoriteFromFavoriteSongs());
    });
  }

  showFavoriteSongs = () => {
    const { favorites } = this.state;
    if (favorites.length === 0) {
      return (
        <h3 className="favorite-songs">Nenhuma Música Favoritada!</h3>
      );
    }
    return (
      <div className="favorite-cards">
        {favorites.map((song) => (
          <MusicCard
            key={ song.trackId }
            musics={ song }
            onChange={ this.callRemoveSongs }
            checked={ favorites
              .some((track) => track.trackId === song.trackId) }
          />
        ))}
      </div>
    );
  };

  removeAndUpdateFavoritesSongs = () => {
    const { loading, favorites } = this.state;
    if (favorites.length === 0) {
      return (
        <h3 className="favorite-songs">Nenhuma Música Favoritada!</h3>
      );
    }
    if (!loading) {
      return (
        <section>
          <div className="favorite-songs">
            <h2>Músicas favoritas:</h2>
          </div>
          { this.showFavoriteSongs() }
        </section>
      );
    }
  }

  render() {
    const { loading } = this.state;
    const loadingTime = (
      <div className="loading-container">
        <img src={ loadingImage } alt="loading..." className="loading" />
      </div>);
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? loadingTime : this.removeAndUpdateFavoritesSongs() }
      </div>
    );
  }
}

export default Favorites;
