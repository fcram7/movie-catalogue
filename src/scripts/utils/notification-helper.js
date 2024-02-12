const NotificationHelper = {
  sendNotification({ title, options }) {
    if (!this._checkAvailability()) {
      console.log('notification not supported in your browser');
      return;
    }

    if (!this._checkPermission()) {
      console.log('Permission is not granted yet');
      this._requestPermission();
      return;
    }

    this._showNotification({ title, options });
  },

  _checkAvailability() {
    return 'Notification' in window;
  },

  _checkPermission() {
    return Notification.permission === 'granted';
  },

  async _requestPermission() {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('permission denied');
    }

    if (status === 'default') {
      console.log('permission closed');
    }
  },

  async _showNotification({ title, options }) {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;

    serviceWorkerRegistration.showNotification(title, options);
  },
};

export default NotificationHelper;
