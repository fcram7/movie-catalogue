/* eslint-disable class-methods-use-this */
import { createMovieItemTemplate } from '../../templates/template-creator';

class FavoriteMovieView {
  getTemplate() {
    return `
      <div id="movie-search-container">
        <input id="query" type="text">

        <h2 class="content__heading">Your Liked Movies</h2>
        <div id="movies" class="movies">

        </div>
      </div>
    `;
  }

  getFavoriteMovieTemplate() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Liked Movies</h2>
        <div id="movies" class="movies">
        
        </div>
      </div>
    `;
  }

  showFavoriteMovies(movies) {
    let html;
    if (movies.length > 0) {
      html = movies.reduce((carry, movie) => carry.concat(createMovieItemTemplate(movie)), '');
    } else {
      html = this._getEmptyMovieTemplate();
    }

    document.getElementById('movies').innerHTML = html;

    document
      .getElementById('movies')
      .dispatchEvent(new Event('movies:updated'));
  }

  _getEmptyMovieTemplate() {
    return `
      <div class="movie-item__not__found">
        Tidak ada film untuk ditampilkan
      </div>
    `;
  }

  // showMovies(movies) {
  //   this.showFavoriteMovies(movies);
  // }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (e) => {
      callback(e.target.value);
    });
  }
}

export default FavoriteMovieView;
