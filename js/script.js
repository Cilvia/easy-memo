require('electron').remote.getCurrentWindow().on('hide',function(){
    document.getElementById("memo").value = null;
});

function makeTask(function_word){
    return new Function("text",function_word)
}

const WordCommand = {"#dodo":"console.log(text)"}

function submit(){
    if(window.event.keyCode==13){
        var memo = document.getElementById("memo").value;
        var words = memo.split(' ')
        words.forEach(word => {
            if(WordCommand[word] != null){
                makeTask(WordCommand[word])(memo.replace(word,''));
                document.getElementById("memo").value = null;
                return;
            }
        });
        document.getElementById("memo").value = null;
    }
}