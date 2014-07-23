function FallingCanvas () {

    var fallingBubbles = []

    return {
        add: function (x, y, shape) {
            fallingBubbles.push(FallingBubble(x, y, shape))
        },
        paint: function (c) {
            for (var i = 0; i < fallingBubbles.length; i++) {
                fallingBubbles[i].paint(c)
            }
        },
        tick: function () {
            for (var i = 0; i < fallingBubbles.length; i++) {
                if (fallingBubbles[i].tick()) {
                    fallingBubbles.splice(i, 1)
                    i--
                }
            }
        },
    }

}
