import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
    const { isMobile, closeMobileMenu } = this.props;
    return (
      <div>
        <ul>
          <li
            onClick={
              isMobile && closeMobileMenu
            }
            aria-hidden="true"
          >
            <Link to="/search" data-testid="link-to-search">
              Search
            </Link>
          </li>
          <li
            onClick={
              isMobile && closeMobileMenu
            }
            aria-hidden="true"
          >
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </li>
          <li
            onClick={
              isMobile && closeMobileMenu
            }
            aria-hidden="true"
          >
            <Link to="/profile" data-testid="link-to-profile">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

Navigation.propTypes = {
  closeMobileMenu: PropTypes.bool.isRequired,
  isMobile: PropTypes.func.isRequired,
};

export default Navigation;
