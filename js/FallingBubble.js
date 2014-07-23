function FallingBubble (x, y, shape) {

    var maxSteps = 16
    var stepIndex = maxSteps
    var dy = 1

    return {
        paint: function (c) {
            c.globalAlpha = stepIndex / maxSteps
            shape.paint(c, x, y)
            c.globalAlpha = 1
        },
        tick: function () {
            dy++
            y += dy
            stepIndex--
            if (!stepIndex) return true
        },
    }

}
