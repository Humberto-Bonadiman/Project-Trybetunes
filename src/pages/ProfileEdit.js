import React from 'react';
import Header from '../components/Header';
// import { BrowserRouter } from 'react-router-dom';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.callGetUserFromUserApi();
  }

  async callGetUserFromUserApi({ target }) {
    const { id } = target;
    const { value } = target;
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({
      [id]: value,
      loading: false,
      name,
      email,
      image,
      description,
    });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    const loadingTime = <p>Carregando...</p>;
    const formEditProfiel = (
      <form>
        <label htmlFor={ name }>
          Nome:
          <input
            type="text"
            data-testid="edit-input-name"
            placeholder="Alterar nome"
            id={ name }
            value={ name }
            onChange={ this.callGetUserFromUserApi }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="edit-input-description"
            placeholder="Alterar descrição"
            id={ description }
            value={ description }
            onChange={ this.callGetUserFromUserApi }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            data-testid="edit-input-email"
            placeholder="Alterar e-mail"
            id={ email }
            value={ email }
            onChange={ this.callGetUserFromUserApi }
          />
        </label>
        <label htmlFor={ image }>
          Foto
          <input
            type="file"
            data-testid="edit-input-image"
            id={ image }
            value={ image }
            onChange={ this.callGetUserFromUserApi }
          />
        </label>
      </form>
    );
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? loadingTime : formEditProfiel }
      </div>
    );
  }
}

export default ProfileEdit;
