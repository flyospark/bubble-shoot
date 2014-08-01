function BubbleShape_Injection_Violet (canvasHeight, radius, scale, violetBubbleShape) {

    var color = 'hsl(300, 100%, 60%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(300, 100%, 40%)', radius)

    BubbleShape_Injection_Canvas(canvas, scale)

    return {
        color: color,
        colorName: 'violet',
        getParticleCanvases: violetBubbleShape.getParticleCanvases,
        isInjection: true,
        laserGradient: violetBubbleShape.laserGradient,
        normalShape: violetBubbleShape,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
