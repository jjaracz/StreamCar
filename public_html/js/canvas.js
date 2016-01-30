var canvas = (function(){
   this._canvasObject = null;
    
   this.init = function(canvasObject){
       this._canvasObject = canvasObject;
       this.drawControls();
   };
   
   this.drawControls = function(){
       this.drawCircle();
       this.drawMainLine();
   };
   
   this.drawCircle = function(){
       
   };
   
   this.drawMainLine = function(){
     // TODO  
   };
});

