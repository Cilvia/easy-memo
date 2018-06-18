const storage = require("electron-json-storage");

require("electron")
  .remote.getCurrentWindow()
  .on("hide", function() {
    document.getElementById("memo").value = null;
  });

window.onload= function(){
    makeCommandTable();
}

function makeTask(function_word) {
  return new Function("text", function_word);
}

var WordCommand = { "#log": "console.log(text)" };

function submit() {
  if (window.event.keyCode == 13) {
    var memo = document.getElementById("memo").value;
    var words = memo.split(" ");
    words.forEach(word => {
      if (WordCommand[word] != null) {
        makeTask(WordCommand[word])(memo.replace(word, ""));
        document.getElementById("memo").value = null;
        return;
      }
    });
    document.getElementById("memo").value = null;
  }
}

function addCommand() {
  WordCommand[document.addCommandForm.word.value] =
    document.addCommandForm.js_code.value;
  updateCmdFile();
  addCommandTable();
}

function makeCommandTable(){
    Object.keys(WordCommand).forEach(function(key) {
        var val = this[key]; // this は obj
        addCommandTable(key)
      }, WordCommand);
}

function addCommandTable(key){
    var table = document.getElementById('table');
    var row = table.insertRow(-1);
    //td分追加
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);

    cell1.innerHTML = '<input type="button" value=削除" id="coladd" onclick="deleteCommandTable(this)">';
    cell2.innerHTML = key;
    cell3.innerHTML = WordCommand[key];
}

function deleteCommandTable(obj){
    // 削除ボタンを押下された行を取得
    tr = obj.parentNode.parentNode;
    delete WordCommand[tr.cells[1]];
    updateCmdFile();
    // trのインデックスを取得して行を削除する
    tr.parentNode.deleteRow(tr.sectionRowIndex);
}

function loadCmdFile() {
  storage.get("config.json", function(error, data) {
    if (error) throw error;
    WordCommand = data;
  });
}

function updateCmdFile() {
  storage.set("config.json", WordCommand, function(error) {
    if (error) throw error;
  });
}
