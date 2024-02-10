import Config from './config';

const API_ENDPOINTS = {
  NOW_PLAYING: `${Config.BASE_URL}movie/now_playing?api_key=${Config.KEY}&language=${Config.DEFAULT_LANGUAGE}&page=1`,
  UPCOMING: `${Config.BASE_URL}movie/upcoming?api_key=${Config.KEY}&language=${Config.DEFAULT_LANGUAGE}&page=1`,
  DETAIL: (id) => `${Config.BASE_URL}movie/${id}?api_key=${Config.KEY}`,
};

export default API_ENDPOINTS;
