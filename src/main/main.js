const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

const APIServer = require('./controllers/apiServer.js');
const PicturesStorage = require ('./repository/picturesStorage.js');
const ExtInterval = require('./controllers/extInterval.js');

const AppConfig = require('./repository/appConfig');
const Repository = require('./repository/repository');

const RemoteCtrlRouter = require('./routes/remoteControl');
const k = require('../common/constants');

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
  return mainWindow;
};

app.whenReady().then(() => {

  const appConfig = new AppConfig();
  console.log(appConfig.toString());
  if( !appConfig.isConfigOk)
  {
    console.log(`Application configuration issue : \n${appConfig.errorMessage()}`);
    app.quit();
  }

  const repo = new Repository(appConfig);

  const mainWin = createWindow();

  let slideShowInterval = appConfig.getSlideShowInterval();
  
  //const webServer = new APIServer(appConfig.getImagesPath(), 3000, path.join(__dirname, './views'));
  const webServer = new APIServer(appConfig.getImagesPath(), 3000, '../views');

  const remoteCtrlRouter = new RemoteCtrlRouter(repo);
  webServer.addRoutes( remoteCtrlRouter.getRouter());

  const slideShow = new ExtInterval(slideShowInterval, () => {
    //console.log('Request to show next image');
    mainWin.webContents.send(k.CH_UPDATE_IMAGE, repo.pictureStorage.getNextImage());
  });

  ipcMain.on(k.CH_RENDERER_READY, (event) => {
    console.log('Renderer ready, send configuration !');

    mainWin.webContents.send(k.CH_UPDATE_IMAGE, repo.pictureStorage.getNextImage());

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