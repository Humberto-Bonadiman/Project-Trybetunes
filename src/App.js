import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllPaths from './components/AllPaths';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <AllPaths />
      </BrowserRouter>
    );
  }
}

export default App;
