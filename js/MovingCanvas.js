function MovingCanvas (canvasWidth, canvasHeight, bubbleRadius, bubbleVisualDiameter) {

    var movingBubbles = []

    return {
        movingBubbles: movingBubbles,
        add: function (shape, dx, dy) {
            var bubble = MovingBubble(canvasWidth, canvasHeight, bubbleRadius, bubbleVisualDiameter, shape, dx, dy)
            movingBubbles.push(bubble)
        },
        paint: function (c) {
            for (var i = 0; i < movingBubbles.length; i++) {
                movingBubbles[i].paint(c)
            }
        },
        remove: function (movingBubble) {
            movingBubbles.splice(movingBubbles.indexOf(movingBubble), 1)
        },
        tick: function () {
            for (var i = 0; i < movingBubbles.length; i++) {
                movingBubbles[i].tick()
            }
        },
    }

}
