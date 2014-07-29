function BubbleShape_VioletBomb (radius, scale) {

    var color = 'hsl(300, 100%, 60%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(300, 100%, 40%)', radius)
    BubbleShape_Bomb(canvas, radius)

    return {
        color: color,
        colorName: 'violet',
        isBomb: true,
        particleCanvases: BombParticleCanvases(scale, color),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
