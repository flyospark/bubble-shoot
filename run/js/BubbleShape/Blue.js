function BubbleShape_Blue (canvasHeight, radius) {

    var color = 'hsl(220, 100%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(220, 100%, 55%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        colorName: 'blue',
        laserGradient: LaserGradient(canvasHeight, c, 220, 100, 70),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
