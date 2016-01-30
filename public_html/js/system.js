var system = (function(){
    this.engine = null;
    this.canvas = null;
    
    this._drawLine = function(x,y){
      console.log(x + " | " + y);  
    };
    
    this.init = function(engine,canvas){
        this.engine = engine;
        this.canvas = canvas;
        var self = this;
        
        $("canvas#main-canvas").mousemove(function(e){
           var parentOffset = $(this).offset();
           var x = e.pageX - parentOffset.left;
           var y = e.pageY - parentOffset.top;
           self._drawLine(x,y);
        }); 
    };
    
});