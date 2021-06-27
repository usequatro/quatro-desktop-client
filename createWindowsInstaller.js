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
      setupIcon: './assets/icon.ico',
      setupExe: `${baseName}-win32-x64.exe`,
    });
    console.log('Packaging for Windows done!');
  } catch (err) {
    console.error(err);
  }
};

createWindowsInstaller();
