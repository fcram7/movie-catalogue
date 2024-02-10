import MovieSource from '../../data/movie-source';
import UrlParser from '../../routes/url-parser';
import { createMovieDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
      <div id="movie" class="movie">

      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detailMovie = await MovieSource.detailMovie(url.id);
    const detailContainer = document.querySelector('#movie');
    detailContainer.innerHTML += createMovieDetailTemplate(detailMovie);
  },
};

export default Detail;
