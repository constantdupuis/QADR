const { contextBridge, ipcRenderer } = require('electron');
const k = require('../common/constants.js');

contextBridge.exposeInMainWorld('electronAPI', {
  handleImageChanges : (callback) => {
    //console.log('handleImageChanges called');
    ipcRenderer.on(k.CH_UPDATE_IMAGE, callback);
  },
  rendererReady : () => { 
    //console.log('rendererReady called');
    ipcRenderer.send(k.CH_RENDERER_READY);
  },
  server : 'localhost',
  port : 3000
});