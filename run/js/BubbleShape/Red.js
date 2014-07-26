function BubbleShape_Red (canvasHeight, radius) {

    var color = 'hsl(5, 100%, 65%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(5, 100%, 40%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        laserGradient: LaserGradient(canvasHeight, c, 5, 100, 65),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
