import API_ENDPOINTS from '../globals/api-endpoints';

class MovieSource {
  static async nowPlayingMovies() {
    const response = await fetch(API_ENDPOINTS.NOW_PLAYING);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async upcomingMovies() {
    const response = await fetch(API_ENDPOINTS.UPCOMING);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async detailMovie(id) {
    const response = await fetch(API_ENDPOINTS.DETAIL(id));
    const responseJson = await response.json();
    return responseJson;
  }
}

export default MovieSource;
