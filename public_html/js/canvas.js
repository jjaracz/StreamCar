var canvas = (function () {
    this._canvasObject = null;
    this._ctx = null;
    this.currentRadius = 0;
    this.intervalGradient = null;

    this.init = function (canvasObject) {
        this._canvasObject = canvasObject;
        this._ctx = this._canvasObject.getContext("2d");
        this._drawControls();
    };

    this.getCenter = function () {
        return {
            x: settings.CANVAS.WIDTH / 2,
            y: settings.CANVAS.HEIGHT / 2
        };
    };

    this.getDirection = function (x, y) {
        var direct = {
            x: null,
            y: null
        };

        var half = {
            x: settings.CANVAS.WIDTH / 2,
            y: settings.CANVAS.HEIGHT / 2
        };

        if (x >= half.x) {
            direct.x = settings.DIRECT.RIGHT;
        } else {
            direct.x = settings.DIRECT.LEFT;
        }

        if (y >= half.y) {
            direct.y = settings.DIRECT.DOWN;
        } else {
            direct.y = settings.DIRECT.UP;
        }

        return {
            x: direct.x,
            y: direct.y
        };
    };

    this._drawControls = function () {
        this.drawCircle();
    };

    this.drawCircle = function () {
        var center = this.getCenter();
        
        this._ctx.beginPath();
        this._ctx.lineWidth = settings.CANVAS.ARC.THICKNESS;
        this._ctx.arc(center.x, center.y, settings.CANVAS.ARC.RADIUS, 0, 2 * Math.PI);
        this._ctx.strokeStyle = settings.CANVAS.ARC.COLOR;
        this._ctx.stroke();
        
        var gradient = this._ctx.createRadialGradient(200, 200, 1, 200, 200, 190);
       // var colors = ["#FFF8E1","#FFECB3","#FFE082","#FFD54F","#FFCA28","#FFC107","#FFB300","#FFA000","#E53935"];
       // var k = 0;
       // for(var i = 0;i<9;i++){
        if(this.currentRadius <= 63){
            gradient.addColorStop(0,"#E8F5E9");
            gradient.addColorStop(1,"#1B5E20");
        } else if (this.currentRadius > 63 && this.currentRadius <= 126){
            gradient.addColorStop(0,"#FFF8E1");
            gradient.addColorStop(1,"#FF8F00");
        } else {
            gradient.addColorStop(0,"#FFEBEE");
            gradient.addColorStop(1,"#D84315");
        }
        
        this._ctx.beginPath();
        this._ctx.arc(center.x, center.y, this.currentRadius, 0, 2 * Math.PI);
        this._ctx.fillStyle = gradient;
        this._ctx.fill();
    };

    this._clearCanvas = function () {
        this._ctx.clearRect(0, 0, settings.CANVAS.WIDTH, settings.CANVAS.HEIGHT);
    };

    this._canLineExist = function (x, y) {
        var center = this.getCenter();
        return (Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2)) <= settings.CANVAS.ARC.RADIUS);
    };

    this.drawLine = function (x, y) {
        this._clearCanvas();

        var center = this.getCenter();
        this.currentRadius = Math.swapPointsToLine(center.x, center.y, x, y);
        this._drawControls();
        this._ctx.beginPath();
        this._ctx.moveTo(center.x, center.y);
        this._ctx.lineTo(x, y);
        this._ctx.stroke();
    };

    this.drawMainLine = function () {
        var center = this.getCenter();

        this._ctx.beginPath();
        this._ctx.moveTo(center.x, center.y);
        this._ctx.lineTo(center.x, (settings.CANVAS.HEIGHT - (settings.CANVAS.ARC.RADIUS * 2)) / 2);
        this._ctx.stroke();
    };
    
    this.drawGradient = function(){
        
    };
});

