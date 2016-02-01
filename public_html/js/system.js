var system = (function (settings) {
    this.engine = null;
    this.canvas = null;
    this._settings = settings;

    this._drawLine = function (x, y) {
        var center = this.canvas.getCenter();
        var radius = this._settings.CANVAS.ARC.RADIUS;
        var res = Math.canLineExistInCircle(center.x, center.y, x, y, radius);
        if (res) {
            console.log(Math.calculateAngleInCircle(x,y));
            this.canvas.drawLine(x, y);
        }
    };

    this.init = function (engine, canvas) {
        this.engine = engine;
        this.canvas = canvas;
        var self = this;
      //  var radius = SETTINGS.ARC.RADIUS;
        $("canvas#main-canvas").mousemove(function (e) {
            var parentOffset = $(this).offset();
            var x = e.pageX - parentOffset.left;
            var y = e.pageY - parentOffset.top;
            self._drawLine(x, y);
            
        });
    };
});