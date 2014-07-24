function MovingCanvas (canvasWidth, canvasHeight, bubbleRadius, bubbleVisualRadius) {

    var movingBubbles = []

    return {
        movingBubbles: movingBubbles,
        add: function (shape, dx, dy) {
            movingBubbles.push(MovingBubble(canvasWidth, canvasHeight, bubbleRadius, bubbleVisualRadius, shape, dx, dy))
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
