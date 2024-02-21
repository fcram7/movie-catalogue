/* eslint-disable no-new */
import FavoriteMoviesIdb from '../../data/favorite-movies-idb';
import FavoriteMovieView from './liked-movies/favorite-movie-view';
import FavoriteMovieSearchPresenter from './liked-movies/favorite-movie-search-presenter';
import FavoriteMovieShowPresenter from './liked-movies/favorite-movie-show-presenter';

const view = new FavoriteMovieView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    // const likedMovies = await FavoriteMoviesIdb.getAllMovies();
    // const movieContainer = document.querySelector('#movies');

    // likedMovies.forEach((movie) => {
    //   movieContainer.innerHTML += createMovieItemTemplate(movie);
    // });

    new FavoriteMovieSearchPresenter({ view, favoriteMovies: FavoriteMoviesIdb });
    new FavoriteMovieShowPresenter({ view, favoriteMovies: FavoriteMoviesIdb });
  },
};

export default Like;
