import NowPlaying from '../views/pages/now-playing';
import Detail from '../views/pages/detail';
import Upcoming from '../views/pages/upcoming';
import Like from '../views/pages/like';

const Routes = {
  '/': NowPlaying,
  '/now-playing': NowPlaying,
  '/detail/:id': Detail,
  '/upcoming': Upcoming,
  '/like': Like,
};

export default Routes;
