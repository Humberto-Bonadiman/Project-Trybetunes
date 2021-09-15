import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
// import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/" exact component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </header>
    );
  }
}

/* Header.propTypes = {

}; */

export default Header;
