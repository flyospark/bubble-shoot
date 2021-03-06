function BubbleShape_Bomb_Green (radius, scale) {

    var color = 'hsl(100, 100%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(100, 100%, 30%)', radius)
    BubbleShape_Bomb_Canvas(canvas, radius, 'hsla(100, 85%, 15%, 0.6)')

    var particleCanvases = BombParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'green',
        isBomb: true,
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
