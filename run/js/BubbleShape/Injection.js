function BubbleShape_Injection (canvas, scale) {

    function lineTo (dx, dy) {
        x += dx
        y += dy
        c.lineTo(x, y)
    }

    var c = canvas.getContext('2d')

    var color = 'rgba(255 ,255, 255, 0.45)'

    var x = -11, y = -7

    c.scale(scale, scale)
    c.beginPath()
    c.moveTo(x, y)
    lineTo(4, -4)
    lineTo(1, 1)
    lineTo(-1, 1)
    lineTo(3.5, 3.5)
    lineTo(3.5, -3.5)
    lineTo(1, 1)
    lineTo(-1.5, 1.5)
    lineTo(9, 9)
    lineTo(-2.5, 2.5)
    lineTo(3.5, 3.5)
    lineTo(0, 2)
    lineTo(-4.5, -4.5)
    lineTo(-2.5, 2.5)
    lineTo(-9, -9)
    lineTo(-1.5, 1.5)
    lineTo(-1, -1)
    lineTo(3.5, -3.5)
    lineTo(-3.5, -3.5)
    lineTo(-1, 1)
    c.closePath()
    c.fillStyle = color
    c.fill()

}
