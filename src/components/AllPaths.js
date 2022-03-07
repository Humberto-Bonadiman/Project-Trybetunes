import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

class AllPaths extends React.Component {
  render() {
    return (
      <main className="login-page">
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/search" component={ Search } />
          <Route exact path="/Project-Trybetunes" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default AllPaths;
