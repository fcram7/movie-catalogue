import MovieSource from '../../data/movie-source';
import { createMovieItemTemplate } from '../templates/template-creator';

const NowPlaying = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Now Playing In Cinemas</h2>

        <div id="movies" class="movies">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const nowPlayingMovies = await MovieSource.nowPlayingMovies();
    const moviesContainer = document.querySelector('#movies');
    nowPlayingMovies.forEach((movie) => {
      moviesContainer.innerHTML += createMovieItemTemplate(movie);
    });
  },
};

export default NowPlaying;
