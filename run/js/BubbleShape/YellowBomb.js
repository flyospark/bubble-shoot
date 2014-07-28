function BubbleShape_YellowBomb (radius) {

    var color = 'hsl(60, 90%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(60, 90%, 40%)', radius)
    BubbleShape_Bomb(canvas, radius)

    return {
        color: color,
        colorName: 'yellow',
        isBomb: true,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
