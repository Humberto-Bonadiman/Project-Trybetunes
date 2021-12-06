import React from 'react';
import './NotFound.css';
import PageNotFound from './images/page-not-found.png';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found">
        <img src={ PageNotFound } alt="page-not-found" />
      </div>
    );
  }
}

export default NotFound;
