function BubbleShape_WhiteBomb (radius) {

    var color = 'hsl(0, 0%, 90%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(0, 0%, 70%)', radius)
    BubbleShape_Bomb(canvas, radius)

    return {
        color: color,
        colorName: 'white',
        isBomb: true,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
