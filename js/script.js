/*************************************/
require("electron")
  .remote.getCurrentWindow()
  .on("hide", function() {
    document.getElementById("memo").value = null;
  });

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
