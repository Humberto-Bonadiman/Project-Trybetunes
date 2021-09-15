import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Header />
      </BrowserRouter>
    );
  }
}

export default App;
