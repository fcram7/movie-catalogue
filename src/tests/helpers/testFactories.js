import FavoriteMoviesIdb from '../../scripts/data/favorite-movies-idb';
import LikeButtonInitiator from '../../scripts/utils/like-button-initiator';

const createLikeButtonPresenterWithMovie = async (movie) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteMovies: FavoriteMoviesIdb,
    movie,
  });
};

export { createLikeButtonPresenterWithMovie };
