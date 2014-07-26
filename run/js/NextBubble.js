function NextBubble (canvasWidth, canvasHeight, bubbleRadius, shape) {

    var x = canvasWidth / 2,
        y = canvasHeight + bubbleRadius,
        maxSteps = 8,
        stepIndex = 0,
        stepSize = bubbleRadius * 2 / maxSteps

    var that = {
        ready: false,
        shape: shape,
        paint: function (c) {
            c.globalAlpha = stepIndex / maxSteps
            shape.paint(c, x, y)
            c.globalAlpha = 1
        },
        tick: function () {
            if (stepIndex < maxSteps) {
                stepIndex++
                y -= stepSize
            } else {
                that.ready = true
            }
        },
    }

    return that

}
