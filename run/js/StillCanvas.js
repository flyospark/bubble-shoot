function StillCanvas (canvasHeight, bubbleRadius, numBubblesHorizontal,
    bubbleDiameter, randomShape, verticalDistance, breakCallback, fallCallback,
    scoreListener, gameOverListener) {

    function add (bubble) {
        var id = bubble.id
        stillBubbles[id] = bubble
        columns[bubble.colNumber][id] = bubble
        checkOverflow(bubble)
    }

    function checkOverflow (bubble) {
        if (!that.gameOver && bubble.rowNumber >= maxRowNumber) {
            that.gameOver = true
            gameOverListener()
        }
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
        var id = bubble.id
        delete stillBubbles[id]
        delete columns[bubble.colNumber][id]
    }

    function shift () {

        for (var i in stillBubbles) {
            var stillBubble = stillBubbles[i]
            moveDown(stillBubble, maxSteps)
            stillBubble.rowNumber++
            checkOverflow(stillBubble)
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

    var stillBubbles = {}
    var moves = {}

    var columns = {}
    for (var i = 0; i < 2 * numBubblesHorizontal - 1; i++) columns[i] = {}

    var maxRowNumber = Math.floor((canvasHeight - bubbleDiameter) / verticalDistance)

    var odd = false

    var breakNumber = 3

    var that = {
        gameOver: false,
        shift: shift,
        stillBubbles: stillBubbles,
        add: function (movingBubble) {

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
            if (neighbors.length >= breakNumber) {

                var bombNeighbors = BombNeighbors(columns, neighbors)

                var n = 0
                for (var i in bombNeighbors) {
                    var neighbor = bombNeighbors[i]
                    remove(neighbor)
                    breakCallback(neighbor.x, neighbor.y, neighbor.shape)
                    n++
                }

                scoreListener(n - breakNumber + 1)

                var orphans = Orphans(columns)
                for (var i in orphans) {
                    var orphan = orphans[i]
                    remove(orphan)
                    fallCallback(orphan.x, orphan.y, orphan.shape)
                }

            }

        },
        getData: function () {
            var data = {
                bubbles: [],
                shiftY: shiftY,
            }
            for (var i in stillBubbles) {
                var bubble = stillBubbles[i]
                var shape = bubble.shape
                data.bubbles.push({
                    colNumber: bubble.colNumber,
                    rowNumber: bubble.rowNumber,
                    shape: {
                        colorName: shape.colorName,
                        isBomb: shape.isBomb,
                    },
                })
            }
            return data
        },
        isOdd: function () {
            return odd
        },
        paint: function (c) {
            for (var i in stillBubbles) stillBubbles[i].paint(c)
        },
        reset: function () {
            that.gameOver = false
            moves = {}
            for (var i in stillBubbles) delete stillBubbles[i]
            for (var i in columns) {
                var columnBubbles = columns[i]
                for (var i in columnBubbles) delete columnBubbles[i]
            }
            shift()
            shift()
            shift()
        },
        tick: function () {

            for (var i in moves) {
                var move = moves[i]
                move.steps--
                move.bubble.y += stepSize
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

    return that

}
