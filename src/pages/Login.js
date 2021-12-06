import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import InputName from './Inputs/InputName';
import './Login.css';
import loadingImage from './images/loading.gif';
import logoPositiva from './images/logo_positiva.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveNameOfInput = this.saveNameOfInput.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  async saveNameOfInput(event) {
    const { name } = this.state;
    event.preventDefault();
    this.setState({
      loading: true,
    });

    await createUser({ name });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { name, loading, redirect } = this.state;
    const lenghtName = 3;
    const loadingTime = (
      <div className="loading-container">
        <img src={ loadingImage } alt="loading..." className="loading" />
      </div>);
    if (loading) {
      return loadingTime;
    }
    return (
      <div data-testid="page-login" className="login-container">
        <div>{ redirect ? <Redirect to="/search" /> : ''}</div>
        <img src={ logoPositiva } alt="logo-trybetunes" className="trybetunes" />
        <form>
          <InputName value={ name } onChange={ this.handleChange } />
          <br />
          <button
            disabled={ name.length < lenghtName }
            data-testid="login-submit-button"
            type="button"
            onClick={ this.saveNameOfInput }
            className="btn-login"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
