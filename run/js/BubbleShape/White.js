function BubbleShape_White (canvasHeight, radius) {

    var color = 'hsl(0, 0%, 90%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(0, 0%, 70%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        laserGradient: LaserGradient(canvasHeight, c, 0, 0, 90),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
