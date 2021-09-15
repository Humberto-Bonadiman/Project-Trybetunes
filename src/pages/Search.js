import React from 'react';
import Header from '../components/Header';
// import { BrowserRouter } from 'react-router-dom';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      music: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      music: event.target.value,
    });
  }

  render() {
    const { music } = this.state;
    const lenghtName = 2;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
