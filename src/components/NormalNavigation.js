import React from 'react';
import Navigation from './Navigation';
import './NormalNavigation.css';

class NormalNavigation extends React.Component {
  render() {
    return (
      <div className="NormalNavigation">
        <Navigation />
      </div>
    );
  }
}

export default NormalNavigation;
