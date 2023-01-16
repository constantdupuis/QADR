const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

const CentralServer = require('./controllers/server.js');
const Pictures = require ('./models/pictures.js');
let currentWindow;

const createWindow = () => {
  console.log('__dirname ' + __dirname);

  const mainWindow = new BrowserWindow({
    title : "QADR",
    width: 1200,
    height: 600,
    backgroundColor: 'darkorange',
    webPreferences:{
      preload : path.join(__dirname,'preload.js')
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

  
  mainWindow.loadFile('./index.html');
  mainWindow.webContents.openDevTools();
  currentWindow = mainWindow;
};

app.whenReady().then(() => {

  createWindow();

  console.log(CentralServer);
  const webServer = new CentralServer();
  const pictures = new Pictures();
  
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