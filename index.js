'use strict';

const {app,BrowserWindow, Menu, Tray} = require('electron')

var win = null;
var setting_win = null;
var tray = null;
var force_quit = false;

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

  setting_win = new BrowserWindow({
    width: 600,
    height: 800
  });

  setting_win.hide();
  setting_win.loadURL('file://' + __dirname + '/setting.html');

  setting_win.on('closed', function () {
    if(!force_quit)
      setting_win.hide();
  });

  tray = new Tray(__dirname + '/img/icon.png');
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Setting', type: 'normal', click:function(){ setting_win.isVisible() ? setting_win.hide() : setting_win.show()}},
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

app.on('will-quit', function () {
  // This is a good place to add tests insuring the app is still
  // responsive and all windows are closed.
  console.log("will-quit");
  win = null;
  setting_win = null;
  tray = null;
});

app.on('before_quit',function(){
  force_quit = true;
});