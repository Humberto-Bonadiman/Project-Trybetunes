import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      update: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.callGetUserFromUserApi();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  callUpdateUseFromUserApi = () => {
    const { name, email, image, description } = this.state;

    this.setState({ loading: true }, async () => {
      await updateUser({ name, email, image, description });
      this.setState({ loading: false, update: true });
    });
  }

  formProfileEdit = () => {
    const { name, email, image, description } = this.state;
    const lenghtButton = name && email && image && description;
    return (
      <form>
        <div>
          <label htmlFor="name">
            Nome
            <input
              data-testid="edit-input-name"
              type="text"
              name="name"
              id="name"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              data-testid="edit-input-email"
              type="text"
              name="email"
              id="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="description">
            Description
            <input
              data-testid="edit-input-description"
              type="text"
              name="description"
              id="description"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
        </div>
        <div>
          <img src={ image } alt={ `Foto de ${name}` } width="200" />
          <input
            data-testid="edit-input-image"
            type="text"
            placeholder="Insira a URL"
            name="image"
            id="image"
            onChange={ this.handleChange }
            value={ image }
          />
        </div>
        <button
          data-testid="edit-button-save"
          type="button"
          onClick={ this.callUpdateUseFromUserApi }
          disabled={ !lenghtButton }
        >
          Salvar
        </button>
      </form>
    );
  }

  callGetUserFromUserApi = async () => {
    const { name, email, image, description } = await getUser();
    this.setState({
      name,
      email,
      image,
      description,
      loading: false,
    });
  }

  render() {
    const { loading, update } = this.state;
    const loadingTime = <span>Carregando...</span>;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? loadingTime : this.formProfileEdit() }
        { update && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
