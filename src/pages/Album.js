import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicsArray: [],
    };
    this.callGetMusicsFromMusicsApi = this.callGetMusicsFromMusicsApi.bind(this);
  }

  componentDidMount() {
    this.callGetMusicsFromMusicsApi();
  }

  async callGetMusicsFromMusicsApi() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musicsArray: musics.slice(1),
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
      artworkUrl100: musics[0].artworkUrl100,
    });
  }

  render() {
    const { musicsArray, artworkUrl100, collectionName, artistName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <article>
          <img src={ artworkUrl100 } alt={ `Album ${artistName}` } />
          <h2 data-testid="artist-name">{ artistName }</h2>
          <h3 data-testid="album-name">{ collectionName }</h3>
          <div>
            { musicsArray.map((music, ind) => <MusicCard key={ ind } musics={ music } />)}
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
