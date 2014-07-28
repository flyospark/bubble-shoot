function BubbleShape_GreenBomb (radius) {

    var color = 'hsl(100, 100%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(100, 100%, 30%)', radius)
    BubbleShape_Bomb(canvas, radius)

    return {
        color: color,
        colorName: 'green',
        isBomb: true,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
