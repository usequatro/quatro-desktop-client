var nativefier = require('nativefier');

// @link https://github.com/nativefier/nativefier/blob/master/docs/api.md#platform
const allowedPlatforms = ['mac', 'windows', 'linux'];

const platform = getPlatform(process.argv);

if (!platform) {
  throw new Error(`No platform specified. Use --platform=mac to specify`);
}
if (!allowedPlatforms.includes(platform)) {
  throw new Error(`Invalid platform value. Allowed values: ${allowedPlatforms.join(', ')}`);
}

// @link https://github.com/nativefier/nativefier/blob/master/API.md#icon
const icon = platform === 'windows' ? './assets/icon.ico' : './assets/icon.png';

// @link https://github.com/nativefier/nativefier/blob/master/API.md#programmatic-api
var options = {
  name: 'Quatro', // will be inferred if not specified
  // targetUrl: 'https://app.usequatro.com',
  targetUrl: 'https://dev.usequatro.com',
  // targetUrl: 'http://localhost:3000',
  out: './build',
  platform,
  icon,
  width: 1280,
  height: 800,
  showMenuBar: false,
  inject: ['./build/injected-scripts/index.bundle.js'],
  singleInstance: false,
  clearCache: false,
  fileDownloadOptions: {
    saveAs: true, // always show "Save As" dialog
  },
  // internalUrls: '.*?',
  // We lie about the user agent so that Google Auth works.
  // @link https://github.com/nativefier/nativefier/issues/831
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:88.0) Gecko/20100101 Firefox/88.0',
  // @link https://github.com/google/google-api-javascript-client/issues/506
  browserwindowOptions: { webPreferences: { nativeWindowOpen: true } },
};

function getPlatform(argv) {
  for (const argument of argv) {
    const result = (argument || '').match(/--platform=([a-z0-9]+)/i);
    if (result && result[1]) {
      return result[1];
    }
  }
}

nativefier
  .buildNativefierApp(options)
  .then((appPath) => {
    console.log('App has been nativefied to', appPath);
  })
  .catch((error) => {
    console.error(error);
  });
