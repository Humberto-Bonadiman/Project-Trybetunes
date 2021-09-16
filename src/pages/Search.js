import React from 'react';
import Header from '../components/Header';
import AlbunsArray from '../components/AlbunsArray';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import { BrowserRouter } from 'react-router-dom';

/* Nesta parte consultei o repositório do Michael Caxias
  Fonte: https://github.com/tryber/sd-014-b-project-trybetunes/pull/2/files */
class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      music: '',
      loading: false,
      artist: '',
      albunsResult: false,
      albuns: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchButtonArtistOrAlbum = this.searchButtonArtistOrAlbum.bind(this);
  }

  handleChange(event) {
    this.setState({
      music: event.target.value,
    });
  }

  async searchButtonArtistOrAlbum() {
    const { music } = this.state;
    this.setState({
      loading: true,
    });
    const receiveResponse = await searchAlbumsAPI(music);
    this.setState({
      loading: false,
      artist: music,
      music: '',
      albunsResult: true,
      albuns: [...receiveResponse],
    });
  }

  render() {
    const { music, loading, artist, albunsResult, albuns } = this.state;
    const lenghtName = 2;
    const loadingTime = <span>Carregando...</span>;
    const element = <p>{ `Resultado de álbuns de: ${artist}` }</p>;
    const formInputAndButton = (
      <div data-testid="page-search">
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="search-artist"
            onChange={ this.handleChange }
            value={ music }
          />
          <button
            disabled={ music.length < lenghtName }
            data-testid="search-artist-button"
            type="button"
            onClick={ this.searchButtonArtistOrAlbum }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
    return (
      <>
        <Header />
        { loading ? loadingTime : formInputAndButton }
        { albunsResult ? element : '' }
        { albunsResult ? <AlbunsArray arrayAlbuns={ albuns } /> : '' }
      </>
    );
  }
}

export default Search;
