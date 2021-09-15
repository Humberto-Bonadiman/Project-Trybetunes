import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import InputName from './Inputs/InputName';
// import { BrowserRouter } from 'react-router-dom';

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
    const loadingTime = <span>Carregando...</span>;
    if (loading) {
      return loadingTime;
    }
    return (
      <div data-testid="page-login">
        <div>{ redirect ? <Redirect to="/search" /> : ''}</div>
        <form>
          <InputName value={ name } onChange={ this.handleChange } />
          <button
            disabled={ name.length < lenghtName }
            data-testid="login-submit-button"
            type="button"
            onClick={ this.saveNameOfInput }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
