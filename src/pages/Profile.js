import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
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

  async callGetUserFromUserApi() {
    const user = await getUser();
    console.log(user);
    const { name, email, image, description } = user;
    this.setState({
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
    const informationProfile = (
      <article>
        <p>{ name }</p>
        <p>{ email }</p>
        <img
          src={ image }
          alt={ `Foto ${name}` }
          width="200"
          data-testid="profile-image"
        />
        <p>{ description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </article>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? loadingTime : informationProfile }
      </div>
    );
  }
}

export default Profile;
