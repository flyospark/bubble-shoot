function StillCanvas (canvasWidth, canvasHeight, bubbleRadius, numBubblesHorizontal, bubbleDiameter, randomShape, verticalDistance) {

    function shift () {

        for (var i = 0; i < stillBubbles.length; i++) {
            moveDown(stillBubbles[i])
        }

        if (odd) createBubbles(bubbleDiameter, numBubblesHorizontal - 1)
        else createBubbles(bubbleRadius, numBubblesHorizontal)
        odd = !odd

    }

    function createBubbles (x, n) {
        for (var i = 0; i < n; i++) {
            var bubbleX = x + i * bubbleDiameter
            var shape = randomShape()
            var y = bubbleRadius - verticalDistance
            var bubble = StillBubble(canvasWidth, bubbleX, y, shape)
            stillBubbles.push(bubble)
            moveDown(bubble)
        }
    }

    function moveDown (bubble) {
        moves.push({
            steps: maxSteps,
            bubble: bubble,
        })
    }

    var maxSteps = 8
    var stepSize = verticalDistance / maxSteps

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
            for (var i = 0; i < stillBubbles.length; i++) {
                stillBubbles[i].paint(c)
            }
        },
        removeAll: function () {
            stillBubbles.splice(0)
        },
        tick: function () {
            for (var i = 0; i < moves.length; i++) {
                var move = moves[i]
                move.steps--
                move.bubble.addY(stepSize)
                if (!move.steps) {
                    moves.splice(i, 1)
                    i--
                }
            }
        },
    }

}
