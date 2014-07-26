function BreakingCanvas (dpp) {

    var breakingBubbles = {}

    return {
        add: function (x, y, shape) {
            var bubble = BreakingBubble(x, y, shape, dpp)
            breakingBubbles[bubble.id] = bubble
        },
        paint: function (c) {
            for (var i in breakingBubbles) breakingBubbles[i].paint(c)
        },
        tick: function () {
            for (var i in breakingBubbles) {
                if (breakingBubbles[i].tick()) delete breakingBubbles[i]
            }
        },
    }

}
