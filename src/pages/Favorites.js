import React from 'react';
import Header from '../components/Header';
// import { BrowserRouter } from 'react-router-dom';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Text Favorites</p>
      </div>
    );
  }
}

export default Favorites;
