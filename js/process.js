var remote = require('remote');
var app = remote.require('app');
var Tray = remote.require('tray');
var Menu = remote.require('menu')

function submit(){
    if(window.event.keyCode==13){
        var memo = document.getElementById("memo").value;
        console.log(memo);
        document.getElementById("example").value = "114514";
    }
}