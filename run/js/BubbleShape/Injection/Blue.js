function BubbleShape_Injection_Blue (canvasHeight, radius, scale, blueBubbleShape) {

    var color = 'hsl(220, 100%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(220, 100%, 55%)', radius)

    BubbleShape_Injection_Canvas(canvas, scale, 'hsla(220, 85%, 20%, 0.6)')

    return {
        color: color,
        colorName: 'blue',
        getParticleCanvases: blueBubbleShape.getParticleCanvases,
        isInjection: true,
        laserGradient: blueBubbleShape.laserGradient,
        normalShape: blueBubbleShape,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
