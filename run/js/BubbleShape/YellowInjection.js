function BubbleShape_YellowInjection (canvasHeight, radius, scale) {

    var color = 'hsl(60, 90%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(60, 90%, 40%)', radius)

    BubbleShape_Injection(canvas, scale)

    return {
        color: color,
        colorName: 'yellow',
        isInjection: true,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
