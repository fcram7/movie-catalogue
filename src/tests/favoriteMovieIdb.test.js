import { itActsAsFavoriteMovieModel } from './contracts/favoriteMovieContracts';
import FavoriteMoviesIdb from '../scripts/data/favorite-movies-idb';

describe('Favorite Movie Idb Contract test implementation', () => {
  afterEach(async () => {
    (await FavoriteMoviesIdb.getAllMovies()).forEach(async (movie) => {
      await FavoriteMoviesIdb.deleteMovie(movie.id);
    });
  });

  itActsAsFavoriteMovieModel(FavoriteMoviesIdb);
});
