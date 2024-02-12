import NotificationHelper from './notification-helper';
import Config from '../globals/config';

const WebsocketInitiator = {
  init(url) {
    const websocket = new WebSocket(url);
    websocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    // console.log(message.data);
    // console.log(JSON.parse(message.data));

    const movie = JSON.parse(message.data);
    NotificationHelper.sendNotification({
      title: `${movie.title} is on cinema!`,
      options: {
        body: movie.overview,
        image: `${Config.BASE_IMAGE_URL + movie.poster_path}`,
      },
    });
  },
};

export default WebsocketInitiator;
