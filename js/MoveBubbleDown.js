function MoveBubbleDown (bubble, verticalDistance) {
    var maxSteps = 8
    var stepIndex = 0
    var stepSize = verticalDistance / maxSteps
    return {
        tick: function () {
            stepIndex++
            bubble.addY(stepSize)
            return stepIndex == maxSteps
        },
    }
}
