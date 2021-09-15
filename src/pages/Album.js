import React from 'react';
import Header from '../components/Header';
// import { BrowserRouter } from 'react-router-dom';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>Text Album</p>
      </div>
    );
  }
}

export default Album;
