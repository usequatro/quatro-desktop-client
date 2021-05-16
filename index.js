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

// @link https://github.com/nativefier/nativefier/blob/master/docs/api.md#programmatic-api
var options = {
  name: 'Quatro', // will be inferred if not specified
  // targetUrl: 'https://app.usequatro.com',
  // targetUrl: 'https://dev.usequatro.com',
  targetUrl: 'http://localhost:3000',
  out: './build',
  platform,
  //   icon: '~/Desktop/icon.png', // NEEDS TO BE SPECIFIED PER PLATFORM
  width: 1280,
  height: 800,
  showMenuBar: false,
  inject: ['./build/injected-scripts/index.bundle.js'],
  singleInstance: false,
  clearCache: false,
  fileDownloadOptions: {
    saveAs: true, // always show "Save As" dialog
  },
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
