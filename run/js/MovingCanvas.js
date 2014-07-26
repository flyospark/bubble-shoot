function MovingCanvas (canvasWidth, canvasHeight,
    bubbleRadius, bubbleVisualDiameter, placeListener, dpp) {

    function remove (bubble) {
        delete movingBubbles[bubble.id]
    }

    var movingBubbles = {}

    return {
        movingBubbles: movingBubbles,
        remove: remove,
        add: function (shape, dx, dy) {
            var bubble = MovingBubble(canvasWidth, canvasHeight,
                bubbleRadius, bubbleVisualDiameter, shape, dx, dy, dpp)
            movingBubbles[bubble.id] = bubble
        },
        paint: function (c) {
            for (var i in movingBubbles) movingBubbles[i].paint(c)
        },
        tick: function () {
            for (var i in movingBubbles) {
                var bubble = movingBubbles[i]
                if (bubble.tick()) {
                    placeListener(bubble)
                    remove(bubble)
                }
            }
        },
    }

}
