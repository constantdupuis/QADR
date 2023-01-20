const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

const APIServer = require('./controllers/apiServer.js');
const PicturesStorage = require ('./repository/picturesStorage.js');
const ExtInterval = require('./controllers/extInterval.js');

const AppConfig = require('./repository/appConfig');
const Repository = require('./repository/repository');

const RemoteCtrlRouter = require('./routes/remoteControl');
const k = require('../common/constants');

let currentWindow;

const createWindow = () => {
  //console.log('__dirname ' + __dirname);

  const mainWindow = new BrowserWindow({
    title : "QADR",
    width: 1200,
    height: 600,
    backgroundColor: 'darkslategray',
    webPreferences:{
      preload : path.join(__dirname,'../renderer/preload.js'),
      sandbox : false
    }
    //,fullscreen : true
  });

  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: app.name,
  //     submenu: [
  //     {
  //       click: () => mainWindow.webContents.send('update-counter', 1),
  //       label: 'Increment',
  //     },
  //     {
  //       click: () => mainWindow.webContents.send('update-counter', -1),
  //       label: 'Decrement',
  //     }
  //     ]
  //   }
  // ]);

  
  mainWindow.loadFile('./src/renderer/index.html');
  mainWindow.webContents.openDevTools();
  currentWindow = mainWindow;
};

app.whenReady().then(() => {

  const appConfig = new AppConfig();
  

  createWindow();

  let slideShowInterval = store.get('slideShowInterval');
  
  const webServer = new APIServer(store.get('imagesPath'), 3000);
  const pictures = new PicturesStorage(store.get('imagesPath'));

  const remoteCtrlRouter = new RemoteCtrlRouter(pictures);
  webServer.addRoutes( remoteCtrlRouter.getRouter());

  const slideShow = new ExtInterval(slideShowInterval, () => {
    //console.log('Request to show next image');
    currentWindow.webContents.send(k.CH_UPDATE_IMAGE, pictures.getNextImage());
  });
  
  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: app.name,
  //     submenu: [
  //     {
  //       click: () => currentWindow.webContents.send('change-image', pictures.nextImage()),
  //       label: 'Next Image',
  //     }
  //     ]
  //   }
  // ]);
  // Menu.setApplicationMenu(menu);

  ipcMain.on(k.CH_RENDERER_READY, (event) => {
    console.log('Renderer ready, send configuration !');

    currentWindow.webContents.send(k.CH_UPDATE_IMAGE, pictures.getNextImage());

    slideShow.start();
  });
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});