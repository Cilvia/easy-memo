/*************************************/
const storage = require("electron-json-storage-sync");

require("electron")
  .remote.getCurrentWindow()
  .on("hide", function() {
    document.getElementById("memo").value = null;
  });

function submit() {
    if (window.event.keyCode == 13) {
        var memo = document.getElementById("memo").value;
        var words = memo.split(" ");
        var WordCommand = loadCmdFile();
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

function makeTask(function_word) {
    return new Function("text", function_word);
  }

function loadCmdFile() {
    const result = storage.get('config');
    if (result.status) {
        return result.data;
    } else {
        WordCommand = {"#log":"console.log(text)"}
        updateCmdFile();
        throw result.error;
    }
}