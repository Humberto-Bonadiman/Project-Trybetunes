import React from 'react';
import Header from '../components/Header';
// import MusicCard from '../components/MusicCard';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import { BrowserRouter } from 'react-router-dom';

class Favorites extends React.Component {
/*   constructor() {
    super();

    this.state = {
      loading: false,
    };
  }
 */
  render() {
  /*     const { loading } = this.state;
    const loadingTime = <span>Carregando...</span>; */
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Text Favorites</p>
      </div>
    );
  }
}

export default Favorites;
