const electronInstaller = require('electron-winstaller');
const { version, description, author } = require('./package.json');

const baseName = `Quatro v${version}`;

const createWindowsInstaller = async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: `./build/${baseName}-win32-x64`,
      outputDirectory: './dist/win32-x64',
      title: baseName,
      authors: author,
      description,
      noMsi: true,
      exe: `${baseName}.exe`,
      version,
      iconUrl: 'https://app.usequatro.com/favicon/favicon.ico',
      setupIcon: './assets/icon.ico',
      loadingGif: './assets/logo-full.png',
      setupExe: `${baseName}-win32-x64.exe`,
    });
    console.log('Packaging for Windows done!');
  } catch (err) {
    console.error(err);
  }
};

createWindowsInstaller();
