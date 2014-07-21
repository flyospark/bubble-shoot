function Bubble (radius, x, y, color) {
    return {
        paint: function (c) {
            c.fillStyle = color
            c.beginPath()
            c.arc(x, y, radius, 0, Math.PI * 2)
            c.fill()
        },
        setDirection: function (dx, dy) {
            dx = _dx
            dy = _dy
        },
        tick: function () {
            x += dx
            y += dy
        },
    }
}
