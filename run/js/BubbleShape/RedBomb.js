function BubbleShape_RedBomb (radius) {

    var color = 'hsl(5, 100%, 65%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(5, 100%, 40%)', radius)
    BubbleShape_Bomb(canvas, radius)

    return {
        color: color,
        colorName: 'red',
        isBomb: true,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
