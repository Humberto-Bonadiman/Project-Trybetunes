import React from 'react';
import { getUser } from '../services/userAPI';
import './Header.css';
import MobileNavigation from './MobileNavigation';
import NormalNavigation from './NormalNavigation';

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
      <header data-testid="header-component" className="header-component">
        <nav className="navigation-links">
          <NormalNavigation />
          <MobileNavigation />
          <p
            data-testid="header-user-name"
            className="username-header"
          >
            { loading ? loadingTime : name }
          </p>
        </nav>
      </header>
    );
  }
}

export default Header;
