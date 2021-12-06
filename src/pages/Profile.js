import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import './Profile.css';
import loadingImage from './images/loading.gif';

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
    const loadingTime = (
      <div className="loading-container">
        <img src={ loadingImage } alt="loading..." className="loading" />
      </div>);
    const informationProfile = (
      <article className="profile-information">
        <div>
          <p className="title-name">Name:</p>
          <p className="profile-text">{ name }</p>
        </div>
        <div>
          <p className="title-name">Email:</p>
          <p className="profile-text">{ email }</p>
        </div>
        <img
          src={ image }
          alt={ `Foto ${name}` }
          width="200"
          data-testid="profile-image"
          className="profile-image"
        />
        <div>
          <p className="title-name">Description:</p>
          <p className="profile-text">{ description }</p>
        </div>
        <Link to="/profile/edit" className="profile-link">Editar perfil</Link>
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
