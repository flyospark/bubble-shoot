function Bubble (radius, x, y, color) {

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
        },
    }

}
