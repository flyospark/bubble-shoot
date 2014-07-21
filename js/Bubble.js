function Bubble (canvasWidth, radius, x, y, color) {

    var dx, dy

    return {
        paint: function (c) {
            c.fillStyle = color
            c.beginPath()
            c.arc(x, y, radius, 0, Math.PI * 2)
            c.fill()
        },
        setDirection: function (_dx, _dy) {
            dx = _dx
            dy = _dy
        },
        tick: function () {

            x += dx * 20
            y += dy * 20

            var overflow = radius - x
            if (overflow > 0) {
                x += 2 * overflow
                dx = -dx
            }

            var overflow = x + radius - canvasWidth
            if (overflow > 0) {
                x -= 2 * overflow
                dx = -dx
            }

        },
    }

}
