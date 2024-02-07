import NowPlaying from '../views/pages/now-playing';
import Detail from '../views/pages/detail';
import Upcoming from '../views/pages/upcoming';

const Routes = {
  '/': NowPlaying,
  '/now-playing': NowPlaying,
  '/detail/:id': Detail,
  '/upcoming': Upcoming,
};

export default Routes;
