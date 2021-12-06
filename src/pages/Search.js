import React from 'react';
import Header from '../components/Header';
import AlbunsArray from '../components/AlbunsArray';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';
import loadingImage from './images/loading.gif';

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
    const loadingTime = (
      <div className="loading-container">
        <img src={ loadingImage } alt="loading..." className="loading" />
      </div>);
    const element = (
      <p
        className="result-name"
      >
        { `Resultado de álbuns de: ${artist}` }
      </p>);
    const formInputAndButton = (
      <div data-testid="page-search" className="page-search">
        <input
          className="input-search"
          data-testid="search-artist-input"
          type="text"
          name="search-artist"
          onChange={ this.handleChange }
          value={ music }
          placeholder="Digite uma banda ou artista"
        />
        <button
          disabled={ music.length < lenghtName }
          data-testid="search-artist-button"
          type="button"
          onClick={ this.searchButtonArtistOrAlbum }
          className="btn-search"
        >
          Pesquisar
        </button>
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
