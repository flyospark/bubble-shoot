function NextBubble (canvasWidth, canvasHeight, radius, shape) {

    var x = canvasWidth / 2
    var y = canvasHeight + radius
    var stepIndex = 8
    var stepSize = radius * 2 / stepIndex

    return {
        shape: shape,
        isReady: function () {
            return !stepIndex
        },
        paint: function (c) {
            shape.paint(c, x, y)
        },
        tick: function () {
            if (stepIndex) {
                stepIndex--
                y -= stepSize
            }
        },
    }

}
