import Config from '../globals/config';
import NotificationHelper from './notification-helper';

const FooterToolsInitiator = {
  async init({ subscribeButton, unsubscribeButton }) {
    this._subscribeButton = subscribeButton;
    this._unsubscribeButton = unsubscribeButton;
    this._registrationServiceWorker = null;

    if ('serviceWorker' in navigator) {
      this._registrationServiceWorker = await navigator.serviceWorker.getRegistration();
    }

    await this._initialListener();
    await this._initialState();
  },

  async _initialListener() {
    this._subscribeButton.addEventListener('click', (e) => {
      this._subscribePushMessage(e);
    });

    this._unsubscribeButton.addEventListener('click', (e) => {
      this._unsubscribePushMessage(e);
    });
  },

  async _initialState() {
    this._showSubscribeButton();
  },

  async _subscribePushMessage(e) {
    e.stopPropagation();

    if (await this._isCurrentSubscriptionAvailable()) {
      window.alert('already subscribed to push message');
      return;
    }

    if (!(await this._isNotificationReady())) {
      console.log('notification is not available');
      return;
    }

    console.log('_subscribePushMessage: subscribing to push notification...');
    const pushSubscription = await this._registrationServiceWorker?.pushManager.subscribe(this._generateSubscribeOptions());

    if (!pushSubscription) {
      console.log('failed to subscribe push message');
      return;
    }

    try {
      await this._sendPostToServer(Config.PUSH_MSG_SUBSCRIBE_URL, pushSubscription);
      console.log('push message has been subscribed');
    } catch (error) {
      console.error('failed to store push notificaiton data to server:', error.message);

      await pushSubscription?.unsubscribe();
    }

    this._showSubscribeButton();
  },

  async _unsubscribePushMessage(e) {
    e.stopPropagation();
    console.log('_unsubscribePushMessage');

    const pushSubscription = await this._registrationServiceWorker?.pushManager.getSubscription();

    if (!pushSubscription) {
      window.alert('have not subscribing to push message');
      return;
    }

    try {
      await this._sendPostToServer(Config.PUSH_MSG_UNSUBSCRIBE_URL, pushSubscription);
      const isHasBeenUnsibscribed = await pushSubscription.unsubscribe();

      if (!isHasBeenUnsibscribed) {
        console.log('failed to unsubscribe push message');
        await this._sendPostToServer(Config.PUSH_MSG_SUBSCRIBE_URL, pushSubscription);
        return;
      }

      console.log('push message has been unsubscribed');
    } catch (error) {
      console.error('failed to erase psuh notification data from server', error.message);
    }

    this._showSubscribeButton();
  },
  _urlB64ToUint8Array: (base64String) => {
    // eslint-disable-next-line no-mixed-operators
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },

  _generateSubscribeOptions() {
    return {
      userVisibleOnly: true,
      applicationServerKey: this._urlB64ToUint8Array(Config.PUSH_MSG_VAPID_PUBLIC_KEY),
    };
  },

  async _sendPostToServer(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseJson = response.json();
    return responseJson;
  },

  _isSubscribedToServerForHiddenSubscribeButton(state = false) {
    if (state) {
      this._subscribeButton.style.display = 'none';
      this._unsubscribeButton.style.display = 'inline-block';
    } else {
      this._subscribeButton.style.display = 'inline-block';
      this._unsubscribeButton.style.display = 'none';
    }
  },

  async _isCurrentSubscriptionAvailable() {
    const checkSubscription = await this._registrationServiceWorker?.pushManager.getSubscription();
    return Boolean(checkSubscription);
  },

  async _isNotificationReady() {
    if (!NotificationHelper._checkAvailability()) {
      console.log('Notification is not supported in this browser');
      return false;
    }

    if (!NotificationHelper._checkPermission()) {
      console.log('user did not granted notification permission yet');
      const status = await Notification.requestPermission();

      if (status === 'denied') {
        window.alert('cannot subscribe to push message because the status of notification permission is denied');
        return false;
      }

      if (status === 'default') {
        window.alert('cannt subscribe to push message because the status of notification permission is ignored');
        return false;
      }
    }

    return true;
  },

  async _showSubscribeButton() {
    this._isSubscribedToServerForHiddenSubscribeButton(
      await this._isCurrentSubscriptionAvailable(),
    );
  },
};

export default FooterToolsInitiator;
