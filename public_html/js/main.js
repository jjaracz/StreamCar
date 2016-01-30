var systemo = new system();
window.onload = function(){
    systemo.init(new canvas(),new canvas());
    systemo.canvas.init(document.getElementById("main-canvas"));
};