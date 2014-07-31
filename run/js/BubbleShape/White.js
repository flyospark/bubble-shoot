function BubbleShape_White (canvasHeight, radius, scale) {

    var color = 'hsl(0, 0%, 90%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(0, 0%, 70%)', radius)
    var c = canvas.getContext('2d')

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'white',
        laserGradient: LaserGradient(canvasHeight, c, 0, 0, 90),
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
