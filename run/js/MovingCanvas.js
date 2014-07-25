function MovingCanvas (canvasWidth, canvasHeight,
    bubbleRadius, bubbleVisualDiameter, placeListener, dpp) {

    function remove (movingBubble) {
        movingBubbles.splice(movingBubbles.indexOf(movingBubble), 1)
    }

    var movingBubbles = []

    return {
        movingBubbles: movingBubbles,
        remove: remove,
        add: function (shape, dx, dy) {
            var bubble = MovingBubble(canvasWidth, canvasHeight,
                bubbleRadius, bubbleVisualDiameter, shape, dx, dy, dpp)
            movingBubbles.push(bubble)
        },
        paint: function (c) {
            for (var i = 0; i < movingBubbles.length; i++) {
                movingBubbles[i].paint(c)
            }
        },
        tick: function () {
            for (var i = 0; i < movingBubbles.length; i++) {
                var movingBubble = movingBubbles[i]
                if (movingBubble.tick()) {
                    placeListener(movingBubble)
                    remove(movingBubble)
                }
            }
        },
    }

}
