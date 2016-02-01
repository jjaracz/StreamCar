Math.__proto__.canLineExistInCircle = function(x1,y1,x2,y2,radius){
    return (Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)) <= radius);
};
Math.__proto__.calculateAngleInCircle = function(x,y){
    var x1 = Math.abs(settings.CANVAS.WIDTH/2 - x);
    var y1 = Math.abs(settings.CANVAS.HEIGHT/2 - y);
    
    return Math.atan(x1 / y1) * (180 / Math.PI);
};