function BubbleShape_Injection_Red (canvasHeight, radius, scale, redBubbleShape) {

    var color = 'hsl(5, 100%, 65%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(5, 100%, 40%)', radius)

    BubbleShape_Injection_Canvas(canvas, scale)

    return {
        color: color,
        colorName: 'red',
        getParticleCanvases: redBubbleShape.getParticleCanvases,
        isInjection: true,
        laserGradient: redBubbleShape.laserGradient,
        normalShape: redBubbleShape,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
