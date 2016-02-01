Math.__proto__.canLineExistInCircle = function(x1,y1,x2,y2,radius){
    return (Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)) <= radius);
};

Math.__proto__.calculateAngleInCircle = function(x,y){
    var x1 = Math.abs(settings.CANVAS.WIDTH/2 - x);
    var y1 = Math.abs(settings.CANVAS.HEIGHT/2 - y);
    
    return parseInt(Math.atan(x1 / y1) * (180 / Math.PI));
};

Math.__proto__.getRadiusRatio = function(x1,y1,x2,y2,radius){
    var line = parseInt(Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)));
    return parseFloat((line / radius) * 100).toFixed(0); 
};