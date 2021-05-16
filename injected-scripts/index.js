console.log(`Quatro desktop client ${process.env.QUATRO_DESKTOP_CLIENT_VERSION}`);

window.postMessage(
  JSON.stringify({
    desktopClientVersion: process.env.QUATRO_DESKTOP_CLIENT_VERSION,
  }),
);
