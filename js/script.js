function submit(){
    if(window.event.keyCode==13){
        var memo = document.getElementById("memo").value;
        console.log(memo);
        document.getElementById("example").value = "114514";
    }
}