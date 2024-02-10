import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker is not supported in your browser');
    return;
  }

  const wb = new Workbox('./sw.bundle.js');

  try {
    // await navigator.serviceWorker.register('./sw.bundle.js');
    wb.register();
    console.log('Service Worker registered');
  } catch (error) {
    console.log('Failed to register Service Worker', error);
  }
};

export default swRegister;
