import FavoriteMoviesIdb from '../scripts/data/favorite-movies-idb';
import * as testFactories from './helpers/testFactories';

describe('Unliking a movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteMoviesIdb.editMovie({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteMoviesIdb.deleteMovie(1);
  });

  it('should display unlike widget when the movie has been liked', async () => {
    await testFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeTruthy();
  });

  it('should not display like widget when the movie has been liked', async () => {
    await testFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="like this movie"]')).toBeFalsy();
  });

  it('should be able to remove liked movie from the list', async () => {
    await testFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));

    expect(await FavoriteMoviesIdb.getAllMovies()).toEqual([]);
  });

  it('should not throw error while user click unlike widget if the unliked movie is not in the list', async () => {
    await testFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    await FavoriteMoviesIdb.deleteMovie(1);
    document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));
    expect(await FavoriteMoviesIdb.getAllMovies()).toEqual([]);
  });
});
