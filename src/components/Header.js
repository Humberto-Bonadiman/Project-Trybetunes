import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  /* Nesta parte eu consultei o repositório da Izabela Guarino
  Fonte: https://github.com/tryber/sd-014-b-project-trybetunes/pull/64/files */
  componentDidMount() {
    getUser().then((data) => {
      this.setState({ name: data.name, loading: false });
    });
  }

  render() {
    const { name, loading } = this.state;
    const loadingTime = <span>Carregando...</span>;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ loading ? loadingTime : name }</p>
        <nav>
          <ul>
            <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
