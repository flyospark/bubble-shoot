function MovingBubble (canvasWidth, canvasHeight, radius, shape, dx, dy) {

    var x = canvasWidth / 2
    var y = canvasHeight - radius

    var stepX = dx * 20
    var stepY = dy * 20

    return {
        shape: shape,
        collides: function (bubbles) {
            for (var i = 0; i < bubbles.length; i++) {
                var bubble = bubbles[i]
                var distance = bubble.distanceTo(x, y)
                if (distance < (radius - 1) * 2) return true
            }
        },
        getX: function () {
            return x
        },
        getY: function () {
            return y
        },
        paint: function (c) {
            shape.paint(c, x, y)
        },
        tick: function () {

            x += stepX
            y += stepY

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
