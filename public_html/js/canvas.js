var canvas = (function(){
   this._canvasObject = null;
   this._ctx = null;
    
   this.init = function(canvasObject){
       this._canvasObject = canvasObject;
       this._ctx = this._canvasObject.getContext("2d");
       this.drawControls();
   };
   
   this._getCenter = function(){
       return {
           x:settings.CANVAS.WIDTH / 2,
           y:settings.CANVAS.HEIGHT / 2
       };
   };
   
   this.drawControls = function(){
       this.drawCircle();
       this.drawMainLine();
   };
   
   this.drawCircle = function(){
       var center = this._getCenter();
       this._ctx.beginPath();
       this._ctx.arc(center.x,center.y,settings.CANVAS.ARC.RADIUS,0,2*Math.PI);
       this._ctx.strokeStyle = settings.CANVAS.ARC.COLOR;
       this._ctx.stroke();
   };
   
   this._clearCanvas = function(){
     this._ctx.clearRect(0,0,settings.CANVAS.WIDTH,settings.CANVAS.HEIGHT);  
   };
   
   this._canLineExist = function(x,y){
       var center = this._getCenter();
       return (Math.sqrt(Math.pow(x - center.x,2) + Math.pow(y - center.y,2)) <= settings.CANVAS.ARC.RADIUS);
   };
   
   this.drawLine = function(x,y){
       var center = this._getCenter();
       this._ctx.beginPath();
       this._ctx.moveTo(center.x,center.y);
       this._ctx.lineTo(x,y);
       this._ctx.stroke();
       
       this._clearCanvas();
   };
   
   this.drawMainLine = function(){
       var center = this._getCenter();
       
       this._ctx.beginPath();
       this._ctx.moveTo(center.x,center.y);
       this._ctx.lineTo(center.x,(settings.CANVAS.HEIGHT - (settings.CANVAS.ARC.RADIUS * 2)) / 2);
       this._ctx.stroke();
   };
});

