function StillCanvas (canvasWidth, canvasHeight, bubbleRadius, numBubblesHorizontal, bubbleDiameter, randomShape, verticalDistance) {

    function createBubbles (colNumber, n) {
        var x = bubbleRadius + colNumber * bubbleRadius
        var y = bubbleRadius - verticalDistance - shiftY
        for (var i = 0; i < n; i++) {
            var shape = randomShape()
            var bubble = StillBubble(canvasWidth, x, y, shape, 0, colNumber)
            stillBubbles.push(bubble)
            moveDown(bubble, maxSteps + shiftIndex)
            x += bubbleDiameter
            colNumber += 2
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
            var stillBubble = stillBubbles[i]
            moveDown(stillBubble, maxSteps)
            stillBubble.rowNumber++
        }

        if (odd) createBubbles(1, numBubblesHorizontal - 1)
        else createBubbles(0, numBubblesHorizontal)

        odd = !odd
        shiftY += verticalDistance
        shiftIndex += maxSteps

    }

    var maxSteps = 4
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
            var shiftOffset = shiftIndex * stepSize - bubbleRadius
            var rowNumber = Math.round((y + shiftOffset) / verticalDistance)
            y = rowNumber * verticalDistance - shiftOffset

            var oddOffset = rowNumber % 2 ? 0 : bubbleRadius
            
            var x = movingBubble.getX()
            var colNumber = Math.round((x - oddOffset) / bubbleDiameter)
            x = colNumber * bubbleDiameter + oddOffset

            var bubble = StillBubble(canvasWidth, x, y, movingBubble.shape, rowNumber, colNumber)
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
