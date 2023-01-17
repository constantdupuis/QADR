const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

const CentralServer = require('./controllers/server.js');
const Pictures = require ('./models/pictures.js');
const ExtInterval = require('./controllers/extInterval.js');

let currentWindow;

const createWindow = () => {
  console.log('__dirname ' + __dirname);

  const mainWindow = new BrowserWindow({
    title : "QADR",
    width: 1200,
    height: 600,
    backgroundColor: 'darkslategray',
    webPreferences:{
      preload : path.join(__dirname,'../renderer/preload.js')
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

  const store = new Store();
  if( !store.get('imagesPath'))
  {
    console.log('Images path set to default : "/home/cdupuis/Pictures/ForPhotoframe"');
    store.set('imagesPath', '/home/cdupuis/Pictures/ForPhotoframe');
  }

  if( !store.get('slideShowInterval'))
  {
    console.log('Slide show interval set to default : 10000');
    store.set('slideShowInterval', 10000);
  }

  createWindow();

  let slideShowInterval = store.get('slideShowInterval');
  
  const webServer = new CentralServer(store.get('imagesPath'));
  const pictures = new Pictures(store.get('imagesPath'));
  const slideShow = new ExtInterval(slideShowInterval, () => {
    console.log('Request to show next image');
    currentWindow.webContents.send('change-image', pictures.nextImage());
  });
  
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
      {
        click: () => currentWindow.webContents.send('change-image', pictures.nextImage()),
        label: 'Next Image',
      }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  ipcMain.on('ready', (event) => {
    console.log('Renderer ready, send configuration !');

    currentWindow.webContents.send('change-image', pictures.nextImage());

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