var electron = require("electron");
var app = electron.app;
var BrowserWindow = require("browser-window");

var mainWindow = null;

app.on("window-all-closed", function() {
    if (process.platform != "darwin") {
        app.quit();
    }
});

app.on("ready", function() {
    mainWindow = new BrowserWindow({
        // ウィンドウ作成時のオプション
    });

    // index.html を開く
    mainWindow.loadUrl("file://" + __dirname + "/index.html");

    mainWindow.on("closed", function() {
        mainWindow = null;
    });
});
