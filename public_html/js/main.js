var systemo = new system(settings);
window.onload = function(){
    systemo.init(new canvas(),new canvas());
    systemo.canvas.init(document.getElementById("main-canvas"));
};