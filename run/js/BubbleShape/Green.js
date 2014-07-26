function BubbleShape_Green (canvasHeight, radius) {

    var color = 'hsl(100, 100%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(100, 100%, 30%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        laserGradient: LaserGradient(canvasHeight, c, 100, 100, 40),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
