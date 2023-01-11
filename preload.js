const { contextBridge } = require('electron');

console.log('preload.js');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    anyString : "Any String from preload"
});