'use strict';

const {app,BrowserWindow, Menu, Tray} = require('electron')

var mainWindow = null;
var tray = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {

  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({
      width: 800,
      height: 50,
      transparent: true,
      frame: false,
     // resizable: false
    });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.setAlwaysOnTop(true);

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
    }
  })

  tray = new Tray(__dirname + '/img/icon.png')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
});