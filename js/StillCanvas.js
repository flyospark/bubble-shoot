function StillCanvas (canvasWidth, canvasHeight, bubbleRadius, numBubblesHorizontal, bubbleDiameter, randomShape, verticalDistance) {

    function createBubbles (x, n) {
        var y = bubbleRadius - verticalDistance - shiftY
        for (var i = 0; i < n; i++) {
            var shape = randomShape()
            var bubble = StillBubble(canvasWidth, x, y, shape)
            stillBubbles.push(bubble)
            moveDown(bubble, maxSteps + shiftIndex)
            x += bubbleDiameter
        }
    }

    function moveDown (bubble, steps) {
        var id = bubble.id
        if (moves[id]) {
            moves[id].steps += steps
        } else {
            moves[id] = {
                steps: steps,
                bubble: bubble,
            }
        }
    }

    function shift () {

        for (var i = 0; i < stillBubbles.length; i++) {
            moveDown(stillBubbles[i], maxSteps)
        }

        if (odd) createBubbles(bubbleDiameter, numBubblesHorizontal - 1)
        else createBubbles(bubbleRadius, numBubblesHorizontal)
        odd = !odd

        shiftY += verticalDistance
        shiftIndex += maxSteps

    }

    var maxSteps = 8
    var stepSize = verticalDistance / maxSteps
    var shiftY = 0
    var shiftIndex = 0

    var canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    var stillBubbles = []
    var moves = {}

    var odd = false

    return {
        canvas: canvas,
        shift: shift,
        stillBubbles: stillBubbles,
        add: function (movingBubble) {

            var y = movingBubble.getY()
            var row = Math.round((y - bubbleRadius) / verticalDistance)
            y = row * verticalDistance + bubbleRadius

            var oddOffset = row % 2 ? 0 : bubbleRadius
            
            var x = movingBubble.getX()
            x = Math.round((x - oddOffset) / bubbleDiameter) * bubbleDiameter + oddOffset

            var bubble = StillBubble(canvasWidth, x, y, movingBubble.shape)
            stillBubbles.push(bubble)
            if (shiftIndex) moveDown(bubble, shiftIndex)

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
            moves = {}
            stillBubbles.splice(0)
        },
        tick: function () {

            for (var i in moves) {
                var move = moves[i]
                move.steps--
                move.bubble.addY(stepSize)
                if (!move.steps) {
                    delete moves[i]
                    i--
                }
            }

            if (shiftIndex) {
                shiftIndex--
                shiftY -= stepSize
            }

        },
    }

}
