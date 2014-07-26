function BubbleShape_Black (radius) {

    var color = 'hsl(0, 0%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(0, 0%, 15%)', radius)

    return {
        color: color,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
