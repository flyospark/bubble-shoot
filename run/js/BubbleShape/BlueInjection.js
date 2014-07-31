function BubbleShape_BlueInjection (canvasHeight, radius, scale) {

    var color = 'hsl(220, 100%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(220, 100%, 55%)', radius)
    var c = canvas.getContext('2d')

    BubbleShape_Injection(canvas, scale)

    var particleCanvases = ParticleCanvases(scale, color)

    return {
        color: color,
        colorName: 'blue',
        isInjection: true,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
