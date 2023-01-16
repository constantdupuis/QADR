const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  handleImageChanges : (callback) => ipcRenderer.on('change-image', callback),
  server : 'localhost',
  port : 3000
});