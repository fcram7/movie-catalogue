import MovieSource from '../../data/movie-source';
import { createMovieItemTemplate } from '../templates/template-creator';

const Upcoming = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Upcoming In Cinemas</h2>

        <div id="movies" class="movies">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const upcomingMovies = await MovieSource.upcomingMovies();
    const movieContainer = document.querySelector('#movies');
    upcomingMovies.forEach((movie) => {
      movieContainer.innerHTML += createMovieItemTemplate(movie);
    });
  },
};

export default Upcoming;
