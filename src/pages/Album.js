import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicsArray: [],
      loading: true,
    };
    this.callGetMusicsFromMusicsApi = this.callGetMusicsFromMusicsApi.bind(this);
  }

  componentDidMount() {
    this.callGetMusicsFromMusicsApi();
  }

  async callGetMusicsFromMusicsApi() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    console.log(musics);
    this.setState({
      musicsArray: musics.slice(1),
      loading: false,
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
    });
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { musicsArray, loading, collectionName, artistName } = this.state;
    const loadingTime = <p>Carregando...</p>;
    if (loading) {
      return (
        <div>
          { loadingTime }
        </div>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <article>
          <img
            src={ musicsArray[0].artworkUrl100 }
            alt={ `Album ${musicsArray[0].artistName}` }
          />
          <h2 data-testid="artist-name">{ artistName }</h2>
          <h3 data-testid="album-name">{ collectionName }</h3>
          <div>
            { musicsArray.map((music) => (<MusicCard
              key={ music.trackId }
              musics={ music }
              previewUrl={ music.previewUrl }
              trackName={ music.trackName }
              trackId={ music.trackId }
              musicsArray={ id }
            />)) }
          </div>
        </article>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
