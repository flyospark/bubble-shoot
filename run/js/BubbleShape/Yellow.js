function BubbleShape_Yellow (canvasHeight, radius, scale) {

    var color = 'hsl(60, 90%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(60, 90%, 40%)', radius)
    var c = canvas.getContext('2d')

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'yellow',
        laserGradient: LaserGradient(canvasHeight, c, 60, 90, 70),
        getParticleCanvases: function (number) {
            var canvases = []
            for (var i = 0; i < number; i++) canvases.push(particleCanvases)
            return canvases
        },
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
