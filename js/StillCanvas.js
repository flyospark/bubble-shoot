function StillCanvas (canvasWidth, canvasHeight, bubbleRadius, numBubblesHorizontal, bubbleDiameter, randomShape, verticalDistance) {

    function add (bubble) {
        stillBubbles.push(bubble)
    }

    function createBubbles (colNumber, n) {
        var x = bubbleRadius + colNumber * bubbleRadius
        var y = bubbleRadius - verticalDistance - shiftY
        for (var i = 0; i < n; i++) {
            var shape = randomShape()
            var bubble = StillBubble(x, y, shape, 0, colNumber)
            add(bubble)
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

    var stillBubbles = []
    var moves = {}

    var columns = {}
    for (var i = 0; i < 2 * numBubblesHorizontal - 1; i++) {
        columns[i] = []
    }

    var odd = false

    return {
        shift: shift,
        stillBubbles: stillBubbles,
        add: function (movingBubble) {

            var y = movingBubble.y
            var shiftOffset = shiftIndex * stepSize - bubbleRadius
            var rowNumber = Math.round((y + shiftOffset) / verticalDistance)
            y = rowNumber * verticalDistance - shiftOffset

            var oddOffset = rowNumber % 2 ? 0 : bubbleRadius
            
            var x = movingBubble.x
            var colNumber = Math.round((x - oddOffset) / bubbleDiameter)
            x = colNumber * bubbleDiameter + oddOffset

            var bubble = StillBubble(x, y, movingBubble.shape, rowNumber, colNumber)
            add(bubble)
            if (shiftIndex) moveDown(bubble, shiftIndex)

        },
        isOdd: function () {
            return odd
        },
        paint: function (c) {
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
