function FallingBubble (x, y, shape, scale) {

    var maxSteps = 32,
        stepsLeft = maxSteps,
        opacity = 1,
        dx = (Math.random() * 2 - 1) * 6 * scale,
        dy = 0

    return {
        id: Math.random(),
        paint: function (c) {
            c.globalAlpha = opacity
            shape.paint(c, x, y)
            c.globalAlpha = 1
        },
        tick: function () {
            x += dx
            y += dy
            dy += scale
            dx *= 0.95
            stepsLeft--
            if (!stepsLeft) return true
            opacity = stepsLeft / maxSteps
        },
    }

}
