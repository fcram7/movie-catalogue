const itActsAsFavoriteMovieModel = (favoriteMovie) => {
  it('should return the movie that has been added', async () => {
    favoriteMovie.editMovie({ id: 1 });
    favoriteMovie.editMovie({ id: 2 });

    expect(await favoriteMovie.getMovie(1)).toEqual({ id: 1 });
    expect(await favoriteMovie.getMovie(2)).toEqual({ id: 2 });
    expect(await favoriteMovie.getMovie(3)).toEqual(undefined);
  });

  it('should refuse adding a movie if it does not have the correct property', async () => {
    favoriteMovie.editMovie({ aProperty: 'property' });

    expect(await favoriteMovie.getAllMovies()).toEqual([]);
  });

  it('can return all of the movies that have been added', async () => {
    favoriteMovie.editMovie({ id: 1 });
    favoriteMovie.editMovie({ id: 2 });

    expect(await favoriteMovie.getAllMovies()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite movie', async () => {
    favoriteMovie.editMovie({ id: 1 });
    favoriteMovie.editMovie({ id: 2 });
    favoriteMovie.editMovie({ id: 3 });

    favoriteMovie.deleteMovie(1);

    expect(await favoriteMovie.getAllMovies()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a movie though the movie has not been added yet', async () => {
    favoriteMovie.editMovie({ id: 1 });
    favoriteMovie.editMovie({ id: 2 });
    favoriteMovie.editMovie({ id: 3 });

    favoriteMovie.deleteMovie(4);

    expect(await favoriteMovie.getAllMovies()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('should be able to search for movies', async () => {
    favoriteMovie.editMovie({ id: 1, title: 'film a' });
    favoriteMovie.editMovie({ id: 2, title: 'film b' });
    favoriteMovie.editMovie({ id: 3, title: 'film abc' });
    favoriteMovie.editMovie({ id: 4, title: 'ini mah film abcd' });

    expect(await favoriteMovie.searchMovies('film a')).toEqual([
      {
        id: 1,
        title: 'film a',
      },
      {
        id: 3,
        title: 'film abc',
      },
      {
        id: 4,
        title: 'ini mah film abcd',
      },
    ]);
  });
};

export { itActsAsFavoriteMovieModel };
