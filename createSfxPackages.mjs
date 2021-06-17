import { createSfxMac, createSfxWindows } from 'node-7z-archive';

createSfxMac('Quatro-darwin-x64', ['./build/Quatro-darwin-x64'])
  .then(() => {
    console.log('Packaging for Mac done!');
  })
  .catch((err) => {
    console.error(err);
  });

createSfxWindows('Quatro-win32-x64', ['./build/Quatro-win32-x64'])
  .then(() => {
    console.log('Packaging for Windows done!');
  })
  .catch((err) => {
    console.error(err);
  });
