function BreakingCanvas () {

    var breakingBubbles = []

    return {
        add: function (x, y, shape) {
            breakingBubbles.push(BreakingBubble(x, y, shape))
            breakingBubbles.push(BreakingBubble(x, y, shape))
        },
        paint: function (c) {
            for (var i = 0; i < breakingBubbles.length; i++) {
                breakingBubbles[i].paint(c)
            }
        },
        tick: function () {
            for (var i = 0; i < breakingBubbles.length; i++) {
                if (breakingBubbles[i].tick()) {
                    breakingBubbles.splice(i, 1)
                    i--
                }
            }
        },
    }

}
