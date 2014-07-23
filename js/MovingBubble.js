function MovingBubble (canvasWidth, canvasHeight, radius, shape, dx, dy) {

    var x = canvasWidth / 2
    var y = canvasHeight - radius

    var stepMultiplier = 20
    var stepX = dx * stepMultiplier
    var stepY = dy * stepMultiplier

    return {
        shape: shape,
        collides: function (stillBubbles) {
            for (var i = 0; i < stillBubbles.length; i++) {
                var stillBubble = stillBubbles[i]
                var distance = stillBubble.distanceTo(x, y)
                if (distance < (radius - 1) * 2) {
                    return {
                        stillBubble: stillBubble,
                        distance: distance,
                    }
                }
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
        shiftBack: function (distance) {

            var hypot = Math.hypot(dx, dy)
            x -= dx * distance / hypot
            y -= dy * distance / hypot

            var underflow = radius - x
            if (underflow > 0) x += 2 * underflow

            var overflow = x + radius - canvasWidth
            if (overflow > 0) x -= 2 * overflow


        },
        tick: function () {

            x += stepX
            y += stepY

            var underflow = radius - x
            if (underflow > 0) {
                x += 2 * underflow
                dx = -dx
                stepX = dx * stepMultiplier
            }

            var overflow = x + radius - canvasWidth
            if (overflow > 0) {
                x -= 2 * overflow
                dx = -dx
                stepX = dx * stepMultiplier
            }

        },
    }

}
