function FallingBubble (x, y, shape) {

    var maxSteps = 32
    var stepIndex = maxSteps
    var dx = (Math.random() * 2 - 1) * 6
    var dy = 1

    return {
        paint: function (c) {
            c.globalAlpha = stepIndex / maxSteps
            shape.paint(c, x, y)
            c.globalAlpha = 1
        },
        tick: function () {
            x += dx
            y += dy
            dy++
            dx *= 0.95
            stepIndex--
            if (!stepIndex) return true
        },
    }

}
