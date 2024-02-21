import FavoriteMoviesIdb from '../../data/favorite-movies-idb';
import MovieSource from '../../data/movie-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { createMovieDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
      <div id="movie" class="movie">

      </div>
      <div id="likeButtonContainer">
      
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detailMovie = await MovieSource.detailMovie(url.id);
    const detailContainer = document.querySelector('#movie');
    detailContainer.innerHTML += createMovieDetailTemplate(detailMovie);

    // const likeButtonContainer = document.querySelector('#likeButtonContainer');
    // likeButtonContainer.innerHTML += createLikeButtonTemplate();

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteMovies: FavoriteMoviesIdb,
      movie: {
        id: detailMovie.id,
        title: detailMovie.title,
        overview: detailMovie.overview,
        backdrop_path: detailMovie.backdrop_path,
        vote_average: detailMovie.vote_average,
      },
    });
  },
};

export default Detail;
