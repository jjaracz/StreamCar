var system = (function (settings) {
    this.canvas = null;
    this._settings = settings;

    this._drawLine = function (x, y) {
        var center = this.canvas.getCenter();
        var radius = this._settings.CANVAS.ARC.RADIUS;
        var res = Math.canLineExistInCircle(center.x, center.y, x, y, radius);
        var data;
        if (res) {
            this.canvas.drawLine(x, y);
            data = {
                direct : this.canvas.getDirection(x,y),
                power : Math.getRadiusRatio(center.x, center.y, x, y, radius),
                degree : Math.calculateAngleInCircle(x,y)
            };
            console.log(data);
          //  
        } else {
            data = {
                direct : this.canvas.getDirection(x,y),
                power : 0,
                degree : 0
            };
        }
        socket.emit('move',data);
    };

    this.init = function (canvas) {
        this.canvas = canvas;
        var self = this;
        socket.emit('setPins');

        $("canvas#main-canvas").mousemove(function (e) {
            var parentOffset = $(this).offset();
            var x = e.pageX - parentOffset.left;
            var y = e.pageY - parentOffset.top;
            self._drawLine(x, y);
        });
    };
});