const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  handleImageChanges : (callback) => ipcRenderer.on('change-image', callback),
  ready : () => { ipcRenderer.send('ready');},
  server : 'localhost',
  port : 3000
});