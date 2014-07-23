function MovingBubble (canvasWidth, canvasHeight, radius, shape, dx, dy) {

    var stepMultiplier = 20
    var stepX = dx * stepMultiplier
    var stepY = dy * stepMultiplier

    var that = {
        shape: shape,
        x: canvasWidth / 2,
        y: canvasHeight - radius,
        collides: function (stillBubbles) {
            for (var i = 0; i < stillBubbles.length; i++) {
                var stillBubble = stillBubbles[i]
                var distance = stillBubble.distanceTo(that.x, that.y)
                if (distance < (radius - 1) * 2) {
                    return {
                        stillBubble: stillBubble,
                        distance: distance,
                    }
                }
            }
        },
        paint: function (c) {
            shape.paint(c, that.x, that.y)
        },
        shiftBack: function (distance) {

            var hypot = Math.hypot(dx, dy)
            that.x -= dx * distance / hypot
            that.y -= dy * distance / hypot

            var underflow = radius - that.x
            if (underflow > 0) that.x += 2 * underflow

            var overflow = that.x + radius - canvasWidth
            if (overflow > 0) that.x -= 2 * overflow


        },
        tick: function () {

            that.x += stepX
            that.y += stepY

            var underflow = radius - that.x
            if (underflow > 0) {
                that.x += 2 * underflow
                dx = -dx
                stepX = dx * stepMultiplier
            }

            var overflow = that.x + radius - canvasWidth
            if (overflow > 0) {
                that.x -= 2 * overflow
                dx = -dx
                stepX = dx * stepMultiplier
            }

        },
    }

    return that

}
