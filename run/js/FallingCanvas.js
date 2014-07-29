function FallingCanvas (scale) {

    var fallingBubbles = {}

    return {
        add: function (x, y, shape) {
            var bubble = FallingBubble(x, y, shape, scale)
            fallingBubbles[bubble.id] = bubble
        },
        paint: function (c) {
            for (var i in fallingBubbles) fallingBubbles[i].paint(c)
        },
        tick: function () {
            for (var i in fallingBubbles) {
                if (fallingBubbles[i].tick()) delete fallingBubbles[i]
            }
        },
    }

}
