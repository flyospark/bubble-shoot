function BubbleShape_GreenInjection (canvasHeight, radius, scale) {

    var color = 'hsl(100, 100%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(100, 100%, 30%)', radius)

    BubbleShape_Injection(canvas, scale)

    return {
        color: color,
        colorName: 'green',
        isInjection: true,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
