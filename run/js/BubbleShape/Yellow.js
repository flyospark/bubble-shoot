function BubbleShape_Yellow (canvasHeight, radius, scale) {

    var color = 'hsl(60, 90%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(60, 90%, 40%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        colorName: 'yellow',
        laserGradient: LaserGradient(canvasHeight, c, 60, 90, 70),
        particleCanvases: ParticleCanvases(scale, color),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
