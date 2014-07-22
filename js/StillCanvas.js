function StillCanvas (canvasWidth, canvasHeight, bubbleRadius, numBubblesHorizontal, bubbleDiameter, randomShape, verticalDistance) {

    function shift () {

        for (var i = 0; i < stillBubbles.length; i++) {
            var bubble = stillBubbles[i]
            moves.push(MoveBubbleDown(bubble, verticalDistance))
        }

        if (odd) {
            createBubbles(bubbleDiameter, numBubblesHorizontal - 1)
            odd = false
        } else {
            createBubbles(bubbleRadius, numBubblesHorizontal)
            odd = true
        }

    }

    function createBubbles (x, n) {
        for (var i = 0; i < n; i++) {
            var bubbleX = x + i * bubbleDiameter
            var shape = randomShape()
            stillBubbles.push(StillBubble(canvasWidth, bubbleX, bubbleRadius, shape))
        }
    }

    var canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    var stillBubbles = []
    var moves = []

    var odd = false

    setInterval(shift, 4000)

    return {
        canvas: canvas,
        shift: shift,
        stillBubbles: stillBubbles,
        add: function (stillBubble) {
            stillBubbles.push(stillBubble)
        },
        isOdd: function () {
            return odd
        },
        paint: function () {
            c.globalCompositeOperation = 'destination-out'
            c.fillStyle = 'rgba(255, 0, 0, 0.4)'
            c.fillRect(0, 0, canvasWidth, canvasHeight)
            c.globalCompositeOperation = 'source-over'
            c.globalAlpha = 0.7
            for (var i = 0; i < stillBubbles.length; i++) {
                stillBubbles[i].paint(c)
            }
        },
        removeAll: function () {
            stillBubbles.splice(0)
        },
        tick: function () {
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].tick()) {
                    moves.splice(i, 1)
                    i--
                }
            }
        },
    }

}
