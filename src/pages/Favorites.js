import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import { BrowserRouter } from 'react-router-dom';

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

  callGetFavoriteFromFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favorites: favoriteSongs,
      loading: false,
    });
  }

  // Nesta parte eu consultei o repositório do Luiz Gustavo
  // Fonte: https://github.com/tryber/sd-014-b-project-trybetunes/pull/42/commits/37e54f8371de73e9b5f9baaad852c297c303fa3b
  callRemoveSongs= (musics) => {
    this.setState({ loading: true }, async () => {
      await removeSong(musics);
      this.callGetFavoriteFromFavoriteSongs();
    });
  }

  showFavoriteSongs = () => {
    const { favorites } = this.state;
    if (favorites.length === 0) {
      return (
        <h3>Nenhuma Música Favoritada!</h3>
      );
    }
    return (
      <div>
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

  render() {
    const { loading } = this.state;
    const loadingTime = <span>Carregando...</span>;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? loadingTime : this.showFavoriteSongs() }
      </div>
    );
  }
}

export default Favorites;
