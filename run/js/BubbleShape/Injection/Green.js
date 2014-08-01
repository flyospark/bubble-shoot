function BubbleShape_Injection_Green (canvasHeight, radius, scale, greenBubbleShape) {

    var color = 'hsl(100, 100%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(100, 100%, 30%)', radius)

    BubbleShape_Injection_Canvas(canvas, scale, 'hsla(100, 85%, 10%, 0.6)')

    return {
        color: color,
        colorName: 'green',
        getParticleCanvases: greenBubbleShape.getParticleCanvases,
        isInjection: true,
        laserGradient: greenBubbleShape.laserGradient,
        normalShape: greenBubbleShape,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
