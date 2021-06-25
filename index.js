var nativefier = require('nativefier');

// @link https://github.com/nativefier/nativefier/blob/master/docs/api.md#platform
const allowedPlatforms = ['mac', 'windows', 'linux'];
const allowedEnvironments = ['production', 'development', 'local'];

const platform = getPlatform(process.argv);
const environment = getEnvironment(process.argv);

if (allowedPlatforms.includes(platform)) {
  console.log(`➡ Using platform ${platform}`);
} else {
  throw new Error(`Invalid platform value. Allowed values: ${allowedPlatforms.join(', ')}`);
}
if (allowedEnvironments.includes(environment)) {
  console.log(`➡ Using environment ${environment}`);
} else {
  throw new Error(`Invalid environment value. Allowed values: ${allowedEnvironments.join(', ')}`);
}

// @link https://github.com/nativefier/nativefier/blob/master/API.md#icon
const icon = platform === 'windows' ? './assets/icon.ico' : './assets/icon.png';

const targetUrls = {
  [allowedEnvironments[0]]: 'https://app.usequatro.com',
  [allowedEnvironments[1]]: 'https://dev.usequatro.com',
  [allowedEnvironments[2]]: 'http://localhost:3000',
};
const targetUrl =
  targetUrls[environment] ||
  (() => {
    throw new Error('No targetUrl');
  })();

// @link https://github.com/nativefier/nativefier/blob/master/API.md#programmatic-api
var options = {
  name: 'Quatro', // will be inferred if not specified
  targetUrl,
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
  // internalUrls value is parsed through RegExp constructor
  // @link https://github.com/nativefier/nativefier/blob/8b34c6d12da7979a8e6973cb74284cc6db8c34d2/app/src/helpers/helpers.ts#L114
  internalUrls: [
    // SSO with OneLogin
    '[^/]*?.onelogin.com/*?',
    // Google Assertion Consumer Service (part of SSO SAML)
    'www.google.com/a/[^/]+/acs',
  ]
    .map((value) => `(${value})`)
    .join('|'),
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

function getEnvironment(argv) {
  for (const argument of argv) {
    const result = (argument || '').match(/--environment=([a-z0-9]+)/i);
    if (result && result[1]) {
      return result[1];
    }
  }
}

nativefier
  .buildNativefierApp(options)
  .then((appPath) => {
    console.log(options);
    console.log('App has been nativefied to', appPath);
  })
  .catch((error) => {
    console.error(error);
  });
