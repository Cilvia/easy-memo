const storage = require("electron-json-storage");

require("electron")
  .remote.getCurrentWindow()
  .on("hide", function() {
    document.getElementById("memo").value = null;
  });

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
}

function makeCommandTable(){
    
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
