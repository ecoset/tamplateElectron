const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ctrls', {
    wctrl: (btn) => ipcRenderer.invoke('ctrls', btn)
});
