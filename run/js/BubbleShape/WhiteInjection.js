function BubbleShape_WhiteInjection (canvasHeight, radius, scale, whiteBubbleShape) {

    var color = 'hsl(0, 0%, 90%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(0, 0%, 70%)', radius)

    BubbleShape_Injection(canvas, scale)

    return {
        color: color,
        colorName: 'white',
        getParticleCanvases: whiteBubbleShape.getParticleCanvases,
        isInjection: true,
        laserGradient: whiteBubbleShape.laserGradient,
        normalShape: whiteBubbleShape,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
