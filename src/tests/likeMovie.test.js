import FavoriteMoviesIdb from '../scripts/data/favorite-movies-idb';
import * as testFactories from './helpers/testFactories';

describe('Liking a movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the movie has not been liked before', async () => {
    await testFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="like this movie"]')).toBeTruthy();
  });

  it('should not show the unlike button when the movie has not liked before', async () => {
    await testFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeFalsy();
  });

  it('should be able to like the movie', async () => {
    await testFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const movie = await FavoriteMoviesIdb.getMovie(1);
    expect(movie).toEqual({ id: 1 });

    await FavoriteMoviesIdb.deleteMovie(1);
  });

  it('should not add a movie again when its already liked', async () => {
    await testFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    await FavoriteMoviesIdb.editMovie({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMoviesIdb.getAllMovies()).toEqual([{ id: 1 }]);

    await FavoriteMoviesIdb.deleteMovie(1);
  });

  it('should not add a movie when it has no ID', async () => {
    await testFactories.createLikeButtonPresenterWithMovie({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMoviesIdb.getAllMovies()).toEqual([]);
  });
});
