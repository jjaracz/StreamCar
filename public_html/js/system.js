var system = (function (settings) {
    this.canvas = null;
    this._settings = settings;

    this._drawLine = function (x, y) {
        var center = this.canvas.getCenter();
        var radius = this._settings.CANVAS.ARC.RADIUS;
        var res = Math.canLineExistInCircle(center.x, center.y, x, y, radius);
        if (res) {
            this.canvas.drawLine(x, y);
            var data = {
                direct : this.canvas.getDirection(),
                power : Math.getRadiusRatio(center.x, center.y, x, y, radius)
            };
            socket.emit('move',data);
        }
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