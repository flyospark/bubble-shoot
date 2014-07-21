function Bubble (canvasWidth, radius, x, y, color) {

    var dx, dy

    return {
        collides: function (bubbles) {
            for (var i = 0; i < bubbles.length; i++) {
                var bubble = bubbles[i]
                var distance = bubble.distanceTo(x, y)
                if (distance < radius * 2) return true
            }
        },
        distanceTo: function (pointX, pointY) {
            return Math.hypot(x - pointX, y - pointY)
        },
        getX: function () {
            return x
        },
        getY: function () {
            return y
        },
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
        setXY: function (_x, _y) {
            x = _x
            y = _y
        },
        tick: function () {

            x += dx * 16
            y += dy * 16

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
