const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  console.log('__dirname ' + __dirname);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      preload : path.join(__dirname,'preload.js')
    }
  });

  win.loadFile('./shows/pictureSlideShow/start.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});