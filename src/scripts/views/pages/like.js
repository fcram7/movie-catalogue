import FavoriteMoviesIdb from '../../data/favorite-movies-idb';
import { createMovieItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Liked Movies</h2>
        <div id="movies" class="movies">
        
        </div>
      </div>
    `;
  },

  async afterRender() {
    const likedMovies = await FavoriteMoviesIdb.getAllMovies();
    const movieContainer = document.querySelector('#movies');

    likedMovies.forEach((movie) => {
      movieContainer.innerHTML += createMovieItemTemplate(movie);
    });
  },
};

export default Like;
