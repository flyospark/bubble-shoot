function BubbleShape_Injection_Yellow (canvasHeight, radius, scale, yellowBubbleShape) {

    var color = 'hsl(60, 90%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(60, 90%, 40%)', radius)

    BubbleShape_Injection_Canvas(canvas, scale)

    return {
        color: color,
        colorName: 'yellow',
        getParticleCanvases: yellowBubbleShape.getParticleCanvases,
        isInjection: true,
        laserGradient: yellowBubbleShape.laserGradient,
        normalShape: yellowBubbleShape,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
