'use strict';

const {app,BrowserWindow, Menu, Tray, globalShortcut} = require('electron')

var win = null;
var setting_win = null;
var tray = null;

function makeSettingWindow() {
  setting_win = new BrowserWindow({
    width: 600,
    height: 800
  });
  setting_win.loadURL('file://' + __dirname + '/setting.html');
  setting_win.setMenu(null);
  setting_win.setIcon(__dirname + '/img/icon.png');
  setting_win.on('closed', function () {
    setting_win = null
  });
}

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
      skipTaskbar: true,
      show:false
    });

 // win.hide();
  win.loadURL('file://' + __dirname + '/index.html');
  win.setAlwaysOnTop(true);

  win.on('closed', function () {
    win = null;
  });

  tray = new Tray(__dirname + '/img/icon.png');
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Write', type: 'normal', click:function(){ win.isVisible() ? win.hide() : win.show()}},
    {label: 'Setting', type: 'normal', click:function(){ (setting_win!=null) ? setting_win.close() : makeSettingWindow()}},
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

  const ret = globalShortcut.register('CommandOrControl+Shift+Space', function(){
    win.isVisible() ? win.hide() : win.show();
  })
  if (!ret) {
    console.log('registration failed')
  }
});

app.on('will-quit', function () {
  // This is a good place to add tests insuring the app is still
  // responsive and all windows are closed.
  win = null;
  setting_win = null;
  tray = null;

    // Unregister a shortcut.
    globalShortcut.unregister('CommandOrControl+Shift+Space');
  
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});

