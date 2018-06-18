/********************************************************** */
const storage = require("electron-json-storage-sync");
var WordCommand;

window.onload= function(){
    loadCmdFile();
    makeCommandTable();
}

function addCommand() {
    WordCommand[document.getElementById("word").value] = document.getElementById("js_code").value;
    updateCmdFile();
    addCommandTable(document.getElementById("word").value);
    document.getElementById("word").value = null;
    document.getElementById("js_code").value = null;
}

function makeCommandTable(){
    Object.keys(WordCommand).forEach(function(key) {
        addCommandTable(key);
    });
}

function addCommandTable(key){
    var table = document.getElementById("table");
    var row = table.insertRow(-1);
    //td分追加
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);

    cell1.innerHTML = '<input type="button" value="削除" id="coladd" onclick="deleteCommandTable(this)">';
    cell2.innerHTML = key;
    cell3.innerHTML = WordCommand[key];
}

function deleteCommandTable(obj){
    // 削除ボタンを押下された行を取得
    tr = obj.parentNode.parentNode;
    delete WordCommand[tr.cells[1].innerHTML];
    console.log(WordCommand);
    updateCmdFile();
    // trのインデックスを取得して行を削除する
    tr.parentNode.deleteRow(tr.sectionRowIndex);
}

function loadCmdFile() {
    const result = storage.get('config');
    if (result.status) {
        WordCommand = result.data;
    } else {
        WordCommand = {"#log":"console.log(text)"}
        updateCmdFile();
        throw result.error;
    }
  /*storage.get("config.json", function(error, data) {
    if (error) throw error;
    console.log(data);
    WordCommand = data;
  });*/
}

function updateCmdFile() {
    const result = storage.set('config', WordCommand);
    if (result.status) {
    // data has been stored
    } else {
        throw result.error;
    }
  /*storage.set("config.json", WordCommand, function(error) {
    if (error) throw error;
  });*/
}
