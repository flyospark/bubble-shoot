function BubbleShape_Blue (canvasHeight, radius, scale) {

    var color = 'hsl(220, 100%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(220, 100%, 55%)', radius)
    var c = canvas.getContext('2d')

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'blue',
        laserGradient: LaserGradient(canvasHeight, c, 220, 100, 70),
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
