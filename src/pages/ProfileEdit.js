import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';
import loadingImage from './images/loading.gif';

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
      <form className="profile-edit-information">
        <input
          data-testid="edit-input-name"
          type="text"
          name="name"
          id="name"
          className="edit-input"
          onChange={ this.handleChange }
          value={ name }
          placeholder="Nome"
        />
        <br />
        <input
          data-testid="edit-input-email"
          type="text"
          name="email"
          id="email"
          className="edit-input"
          onChange={ this.handleChange }
          value={ email }
          placeholder="E-mail"
        />
        <br />
        <input
          data-testid="edit-input-description"
          type="text"
          name="description"
          id="description"
          className="edit-input"
          onChange={ this.handleChange }
          value={ description }
          placeholder="Description"
        />
        <img
          className="image-profile"
          src={ image }
          alt={ `Foto de ${name}` }
        />
        <br />
        <input
          data-testid="edit-input-image"
          type="text"
          placeholder="Insira a URL"
          name="image"
          id="image"
          className="edit-input"
          onChange={ this.handleChange }
          value={ image }
        />
        <button
          data-testid="edit-button-save"
          type="button"
          onClick={ this.callUpdateUseFromUserApi }
          disabled={ !lenghtButton }
          className="btn-profile"
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
    const loadingTime = (
      <div className="loading-container">
        <img src={ loadingImage } alt="loading..." className="loading" />
      </div>);
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
