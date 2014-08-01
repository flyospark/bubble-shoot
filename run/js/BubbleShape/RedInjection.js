function BubbleShape_RedInjection (canvasHeight, radius, scale) {

    var color = 'hsl(5, 100%, 65%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(5, 100%, 40%)', radius)

    BubbleShape_Injection(canvas, scale)

    return {
        color: color,
        colorName: 'red',
        isInjection: true,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}