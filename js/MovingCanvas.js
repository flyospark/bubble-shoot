function MovingCanvas (canvasWidth, canvasHeight, bubbles, bubbleRadius, verticalDistance, bubbleDiameter, init) {

    var movingBubbles = []

    var canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    return {
        canvas: canvas,
        add: function (movingBubble) {
            movingBubbles.push(movingBubble)
        },
        paint: function () {
            c.globalCompositeOperation = 'destination-out'
            c.fillStyle = 'rgba(255, 0, 0, 0.4)'
            c.fillRect(0, 0, canvasWidth, canvasHeight)
            c.globalCompositeOperation = 'source-over'
            c.globalAlpha = 0.7
            for (var i = 0; i < movingBubbles.length; i++) {
                movingBubbles[i].paint(c)
            }
        },
        tick: function () {

            for (var i = 0; i < movingBubbles.length; i++) {
                movingBubbles[i].tick()
            }

            for (var i = 0; i < movingBubbles.length; i++) {
                var movingBubble = movingBubbles[i]
                if (movingBubble.collides(bubbles)) {

                    var y = movingBubble.getY()
                    var row = Math.round((y - bubbleRadius) / verticalDistance)
                    y = row * verticalDistance + bubbleRadius

                    if (y > canvasHeight - 2 * verticalDistance) {
                        bubbles.splice(0)
                        movingBubbles = []
                        init()
                    } else {

                        var x = movingBubble.getX()
                        x -= bubbleRadius
                        if (row % 2) x += bubbleRadius
                        x = Math.round(x / bubbleDiameter) * bubbleDiameter + bubbleRadius
                        if (row % 2) x -= bubbleRadius

                        movingBubbles.splice(i, 1)

                        bubbles.push(Bubble(canvasWidth, x, y, movingBubble.shape))

                        i--

                    }

                }
            }

        },
    }

}
