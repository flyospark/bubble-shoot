function NextBubble (canvasWidth, canvasHeight, bubbleRadius, shape) {

    var x = canvasWidth / 2
    var y = canvasHeight + bubbleRadius
    var stepIndex = 6
    var stepSize = bubbleRadius * 2 / stepIndex

    var that = {
        ready: false,
        shape: shape,
        paint: function (c) {
            shape.paint(c, x, y)
        },
        tick: function () {
            if (stepIndex) {
                stepIndex--
                y -= stepSize
            } else {
                that.ready = true
            }
        },
    }

    return that

}
