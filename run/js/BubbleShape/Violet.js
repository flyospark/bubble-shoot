function BubbleShape_Violet (canvasHeight, radius) {

    var color = 'hsl(300, 100%, 60%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(300, 100%, 40%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        laserGradient: LaserGradient(canvasHeight, c, 300, 100, 60),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
