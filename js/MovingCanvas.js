function MovingCanvas () {

    var movingBubbles = []

    return {
        movingBubbles: movingBubbles,
        add: function (movingBubble) {
            movingBubbles.push(movingBubble)
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
