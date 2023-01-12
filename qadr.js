const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const express = require('express');

const createWindow = () => {
  console.log('__dirname ' + __dirname);

  const mainWindow = new BrowserWindow({
    title : "QADR",
    width: 1600,
    height: 900,
    backgroundColor: 'darkorange',
    webPreferences:{
      preload : path.join(__dirname,'preload.js')
    }
    //,fullscreen : true
  });

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
      {
        click: () => mainWindow.webContents.send('update-counter', 1),
        label: 'Increment',
      },
      {
        click: () => mainWindow.webContents.send('update-counter', -1),
        label: 'Decrement',
      }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);

  mainWindow.loadFile('./shows/pictureSlideShow/start.html');

  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {

  ipcMain.on('counter-value', (_event, value) => {
    console.log(value) // will print value to Node console
  });

  createWindow();

  console.log('Start Express server');
  var expApp = express();
  expApp.listen(3000);
  console.log('Express server started');

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