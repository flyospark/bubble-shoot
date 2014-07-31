function BubbleShape_VioletInjection (canvasHeight, radius, scale) {

    var color = 'hsl(300, 100%, 60%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(300, 100%, 40%)', radius)

    BubbleShape_Injection(canvas, scale)

    return {
        color: color,
        colorName: 'violet',
        isInjection: true,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
