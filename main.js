const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        center: true,
        title: 'NoFrame',
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            devTools:false
        }
    });
    win.loadFile('index.html');
    win.webContents.openDevTools();

    ipcMain.handle('ctrls', (e, btn) => {
        let res = { class: btn, btn: null };
        if(btn === 'min-btn') {
            win.minimize();
        } else if(btn === 'max-btn') {
            if(!win.isMaximized()) {
                win.maximize();
                res.btn = 'MAX';
            } else {
                win.unmaximize();
                res.btn = 'UNMAX';
            }
        } else if (btn === 'close-btn') {
            win.close();
        } else if (btn === 'resize') {
            if(win.isMaximized()) {
                win.maximize();
                res.btn = 'MAX';
            } else {
                win.unmaximize();
                res.btn = 'UNMAX';
            }
        }
        return res;
    });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})