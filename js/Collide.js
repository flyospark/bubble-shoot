function Collide (movingBubbles, stillBubbles, bubbleRadius, verticalDistance, canvasWidth, canvasHeight, stillCanvas, bubbleDiameter) {

    var newStillBubbles = []

    for (var i = 0; i < movingBubbles.length; i++) {
        var movingBubble = movingBubbles[i]
        if (movingBubble.collides(stillBubbles)) {

            var y = movingBubble.getY()
            var row = Math.round((y - bubbleRadius) / verticalDistance)
            y = row * verticalDistance + bubbleRadius

            if (y > canvasHeight - 2 * verticalDistance) {
                movingBubbles = []
                init()
            } else {

                var odd = (row + (stillCanvas.isOdd() ? 0 : 1)) % 2

                var x = movingBubble.getX()
                x -= bubbleRadius
                if (odd) x += bubbleRadius
                x = Math.round(x / bubbleDiameter) * bubbleDiameter + bubbleRadius
                if (odd) x -= bubbleRadius

                movingBubbles.splice(i, 1)

                newStillBubbles.push(StillBubble(canvasWidth, x, y, movingBubble.shape))

                i--

            }

        }
    }

    return newStillBubbles

}
