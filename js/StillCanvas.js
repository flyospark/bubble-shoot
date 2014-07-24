function StillCanvas (bubbleRadius, numBubblesHorizontal, bubbleDiameter, randomShape, verticalDistance) {

    function add (bubble) {
        stillBubbles.push(bubble)
        columns[bubble.colNumber].push(bubble)
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

    function remove (bubble) {
        stillBubbles.splice(stillBubbles.indexOf(bubble), 1)
        var columnBubbles = columns[bubble.colNumber]
        columnBubbles.splice(columnBubbles.indexOf(bubble), 1)
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

    var columns = []
    for (var i = 0; i < 2 * numBubblesHorizontal - 1; i++) {
        columns[i] = []
    }

    var odd = false

    return {
        shift: shift,
        stillBubbles: stillBubbles,
        add: function (movingBubble, breakCallback, fallCallback) {

            var y = movingBubble.y
            var shiftOffset = shiftIndex * stepSize - bubbleRadius
            var rowNumber = Math.round((y + shiftOffset) / verticalDistance)
            y = rowNumber * verticalDistance - shiftOffset

            var oddOffset = (rowNumber + (odd ? 1 : 0)) % 2 ? bubbleRadius : 0
            
            var x = movingBubble.x
            x = Math.round((x - oddOffset) / bubbleDiameter) * bubbleDiameter + oddOffset

            var colNumber = Math.floor(x / bubbleRadius) - 1
            var bubble = StillBubble(x, y, movingBubble.shape, rowNumber, colNumber)
            add(bubble)
            if (shiftIndex) moveDown(bubble, shiftIndex)

            var neighbors = Neighbors(bubble, columns)
            if (neighbors.length >= 3) {

                for (var i = 0; i < neighbors.length; i++) {
                    var neighbor = neighbors[i]
                    remove(neighbor)
                    breakCallback(neighbor.x, neighbor.y)
                }

                var orphans = Orphans(columns)
                for (var i = 0; i < orphans.length; i++) {
                    var orphan = orphans[i]
                    remove(orphan)
                    fallCallback(orphan.x, orphan.y, orphan.shape)
                }

            }

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
            for (var i in columns) columns[i].splice(0)
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
