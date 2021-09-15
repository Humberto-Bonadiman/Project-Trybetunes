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
          <Link to="/search">Pesquisar</Link>
          <Link to="/album/:id">Album</Link>
          <Link to="/favorites">Favoritas</Link>
          <Link to="/profile">Perfil</Link>
          <Link to="/profile/edit">Editar Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
