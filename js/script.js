require('electron').remote.getCurrentWindow().on('hide',function(){
    document.getElementById("memo").value = null;
});

function submit(){
    if(window.event.keyCode==13){
        var memo = document.getElementById("memo").value;
        console.log(memo);
    }
}