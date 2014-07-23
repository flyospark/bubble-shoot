function BreakingCanvas () {

    var breakingBubbles = []

    return {
        add: function (x, y) {
            breakingBubbles.push(BreakingBubble(x, y))
            breakingBubbles.push(BreakingBubble(x, y))
            console.log(breakingBubbles.length)
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
