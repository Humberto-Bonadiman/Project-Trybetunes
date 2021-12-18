import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AlbunsArray.css';

/* Esta parte eu consultei o repositório da Bel Albuquerque
  Fonte: https://github.com/tryber/sd-014-b-project-trybetunes/pull/13/files */
class AlbunsArray extends React.Component {
  render() {
    const { arrayAlbuns } = this.props;

    const albunsList = arrayAlbuns.map(({ artistName,
      collectionId, collectionName, artworkUrl100,
    }) => (
      <Link
        key={ collectionId }
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
        className="album-card"
      >
        <article className="container-card">
          <img src={ artworkUrl100 } alt="album" />
          <p>{ collectionName }</p>
          <p>{ artistName }</p>
        </article>
      </Link>
    ));

    const albumNotFound = <p className="nothing-found">Nenhum álbum foi encontrado</p>;
    const lookAlbum = albunsList.length > 0;

    return (
      <article className="article-cards">
        { lookAlbum ? albunsList : albumNotFound }
      </article>
    );
  }
}

AlbunsArray.propTypes = {
  arrayAlbuns: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default AlbunsArray;
