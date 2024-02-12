import { openDB } from 'idb';
import Config from '../globals/config';

const {
  DATABASE_NAME,
  DATABASE_VERSION,
  OBJECT_STORE_NAME,
} = Config;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteMoviesIdb = {
  async getMovie(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllMovies() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async editMovie(movie) {
    return (await dbPromise).put(OBJECT_STORE_NAME, movie);
  },

  async deleteMovie(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteMoviesIdb;
