'use strict';

const {app,BrowserWindow, Menu, Tray} = require('electron')

var win = null;
var setting_win = null;
var tray = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {

  // ブラウザ(Chromium)の起動, 初期画面のロード
  win = new BrowserWindow({
      width: 800,
      height: 50,
      transparent: true,
      frame: false,
     // resizable: false,
      skipTaskbar: true
    });

  win.hide();
  win.loadURL('file://' + __dirname + '/index.html');

  win.setAlwaysOnTop(true);

  tray = new Tray(__dirname + '/img/icon.png');
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Setting', type: 'normal'},
    {label: 'Quit', type: 'normal', role:'quit'}
  ]);
  tray.setHighlightMode('never');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show();
  })
  win.on('show', () => {
    tray.setHighlightMode('always');
  })
  win.on('hide', () => {
    tray.setHighlightMode('never');
  })
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
  }
})