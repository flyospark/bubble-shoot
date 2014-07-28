function BubbleShape_BlueBomb (radius) {

    var color = 'hsl(220, 100%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(220, 100%, 55%)', radius)
    BubbleShape_Bomb(canvas, radius)

    return {
        color: color,
        colorName: 'blue',
        isBomb: true,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
