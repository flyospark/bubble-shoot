(function () {
function Background (width, canvasHeight, bubbleDiameter, dpp) {

    var bubbleRadius = bubbleDiameter / 2,
        padding = 8 * dpp,
        lineWidth = 4 * dpp,
        lineY = bubbleRadius - lineWidth / 2,
        paddedRadius = bubbleRadius + padding,
        angle = Math.asin(lineY / paddedRadius),
        cos = Math.sqrt(1 - Math.pow(lineY / paddedRadius, 2)) * paddedRadius,
        height = bubbleDiameter + padding + lineWidth,
        halfWidth = width / 2,
        y = canvasHeight - height

    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    var c = canvas.getContext('2d')
    c.lineJoin = c.lineCap = 'round'
    c.translate(halfWidth, height - bubbleRadius)
    c.moveTo(-halfWidth + lineWidth, -lineY)
    c.lineTo(-cos, -lineY)
    c.arc(0, 0, paddedRadius, -Math.PI + angle, -angle)
    c.lineTo(halfWidth - lineWidth, -lineY)
    c.strokeStyle = '#555'
    c.lineWidth = lineWidth
    c.stroke()

    return {
        paint: function (c) {
            c.drawImage(canvas, 0, y)
        },
    }

}
;
function BlurCanvas (canvasWidth, canvasHeight) {

    var canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    return {
        c: c,
        canvas: canvas,
        clear: function () {
            c.fillStyle = 'rgba(0, 0, 0, 0.4)'
            c.fillRect(0, 0, canvasWidth, canvasHeight)
        },
    }

}
;
function BreakingBubble (x, y, shape, dpp) {

    var maxSteps = 16
    var stepIndex = maxSteps
    var fullCircle = Math.PI * 2

    var scale = 2 * dpp
    var particles = []
    for (var i = 0; i < 6; i++) {
        var locationXY = RandomXY(scale, scale)
        var directionXY = RandomXY(scale, scale)
        particles.push({
            x: x + locationXY[0],
            y: y + locationXY[1],
            dx: directionXY[0],
            dy: directionXY[1],
        })
    }

    return {
        id: Math.random(),
        paint: function (c) {

            if (stepIndex == maxSteps) shape.paint(c, x, y)

            for (var i in particles) {
                var particle = particles[i],
                    px = particle.x,
                    py = particle.y
                c.beginPath()
                c.moveTo(px, py)
                c.fillStyle = shape.color
                c.arc(px, py, 4 * stepIndex / maxSteps * dpp, 0, fullCircle)
                c.fill()
            }

        },
        tick: function () {

            for (var i in particles) {
                var particle = particles[i]
                particle.x += particle.dx
                particle.y += particle.dy
            }

            stepIndex--
            if (!stepIndex) return true

        },
    }

}
;
function BreakingCanvas (dpp) {

    var breakingBubbles = {}

    return {
        add: function (x, y, shape) {
            var bubble = BreakingBubble(x, y, shape, dpp)
            breakingBubbles[bubble.id] = bubble
        },
        paint: function (c) {
            for (var i in breakingBubbles) breakingBubbles[i].paint(c)
        },
        tick: function () {
            for (var i in breakingBubbles) {
                if (breakingBubbles[i].tick()) delete breakingBubbles[i]
            }
        },
    }

}
;
function Collide (movingBubbles, stillBubbles, bubbleVisualDiameter) {
    var collisions = []
    for (var i in movingBubbles) {
        var movingBubble = movingBubbles[i]
        for (var j in stillBubbles) {

            var stillBubble = stillBubbles[j],
                dx = stillBubble.x - movingBubble.x,
                dy = stillBubble.y - movingBubble.y,
                distance = Math.hypot(dx, dy)

            if (distance < bubbleVisualDiameter) {
                collisions.push({
                    movingBubble: movingBubble,
                    stillBubble: stillBubble,
                    distance: distance,
                })
                break
            }

        }
    }
    return collisions
}
;
function FallingCanvas (dpp) {

    var fallingBubbles = {}

    return {
        add: function (x, y, shape) {
            var bubble = FallingBubble(x, y, shape, dpp)
            fallingBubbles[bubble.id] = bubble
        },
        paint: function (c) {
            for (var i in fallingBubbles) fallingBubbles[i].paint(c)
        },
        tick: function () {
            for (var i in fallingBubbles) {
                if (fallingBubbles[i].tick()) delete fallingBubbles[i]
            }
        },
    }

}
;
function FallingBubble (x, y, shape, dpp) {

    var maxSteps = 32,
        stepsLeft = maxSteps,
        opacity = 1,
        dx = (Math.random() * 2 - 1) * 6 * dpp,
        dy = 0

    return {
        id: Math.random(),
        paint: function (c) {
            c.globalAlpha = opacity
            shape.paint(c, x, y)
            c.globalAlpha = 1
        },
        tick: function () {
            x += dx
            y += dy
            dy += dpp
            dx *= 0.95
            stepsLeft--
            if (!stepsLeft) return true
            opacity = stepsLeft / maxSteps
        },
    }

}
;
function Laser (canvasWidth, canvasHeight, bubbleRadius, thinkness, c, minShootDY) {

    var radius = Math.max(canvasWidth, canvasHeight) * 2

    var bubbleX = canvasWidth / 2,
        bubbleY = canvasHeight - bubbleRadius

    return {
        paint: function (c, x, y, gradient) {

            var touchX = x - bubbleX,
                touchY = y - bubbleY,
                touchHypot = Math.hypot(touchX, touchY),
                endX = touchX * radius / touchHypot,
                endY = touchY * radius / touchHypot

            if (touchY / touchHypot < -minShootDY) {
                c.beginPath()
                c.moveTo(bubbleX, bubbleY)
                c.lineTo(bubbleX + endX, bubbleY + endY)
                c.lineWidth = thinkness
                c.lineCap = 'round'
                c.strokeStyle = gradient
                c.stroke()
            }

        },
    }

}
;
function LaserGradient (canvasHeight, c, h, s, l) {
    var hsl = h + ', ' + s + '%, ' + l + '%'
    var gradient = c.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, 'hsla(' + hsl + ', 0)')
    gradient.addColorStop(1, 'hsla(' + hsl + ', 0.2)')
    return gradient
}
;
function MainCanvas (width, height, dpp) {

    var x = (width - width * dpp) / 2,
        y = (height - height * dpp) / 2

    var canvas = document.createElement('canvas')
    canvas.className = 'MainCanvas'
    canvas.width = width
    canvas.height = height
    canvas.style.transform =
        'scale(' + (1 / dpp) + ')' +
        ' translate(' + x + 'px, ' + y + 'px)'
    return canvas

}
;
function MainPanel () {

    function getNextBubble () {
        var shape = nextBubbleRandomShape.get()
        return NextBubble(canvasWidth, canvasHeight, bubbleRadius, shape)
    }

    function repaint () {
        requestAnimationFrame(function () {

            var time = Date.now()

            blurCanvas.clear()
            c.clearRect(0, 0, canvasWidth, canvasHeight)
            background.paint(blurC)
            score.paint(blurC)
            stillCanvas.paint(blurC)
            if (touchStarted) laser.paint(blurC, touchX, touchY, nextBubble.shape.laserGradient)
            if (nextBubble) nextBubble.paint(blurC)
            movingCanvas.paint(blurC)
            breakingCanvas.paint(blurC)
            fallingCanvas.paint(blurC)
            if (resultCanvas.visible) resultCanvas.paint(blurC)
            c.drawImage(blurCanvas.canvas, 0, 0)

            debugRepaintElement.innerHTML = 'repaint ' + (Date.now() - time)

            repaint()

        })
    }

    function tick () {

        var time = Date.now()

        stillCanvas.tick()
        movingCanvas.tick()
        breakingCanvas.tick()
        fallingCanvas.tick()
        if (resultCanvas.visible) resultCanvas.tick()
        if (nextBubble) nextBubble.tick()

        var collisions = Collide(movingCanvas.movingBubbles,
            stillCanvas.stillBubbles, bubbleVisualDiameter)

        for (var i = 0; i < collisions.length; i++) {
            var collision = collisions[i]
            var movingBubble = collision.movingBubble
            movingBubble.shiftBack(bubbleDiameter - collision.distance)
            placeMovingBubble(movingBubble)
            movingCanvas.remove(movingBubble)
        }

        debugTickElement.innerHTML = 'tick ' + (Date.now() - time)

    }

    function placeMovingBubble (movingBubble) {
        stillCanvas.add(movingBubble)
        shot++
        if (shot === maxShots) {
            shot = 0
            stillCanvas.shift()
        }
    }

    var dpp = devicePixelRatio
    var width = innerWidth * dpp
    var height = innerHeight * dpp

    var bubbleDiameter = 40 * dpp
    var bubbleRadius = bubbleDiameter / 2
    var verticalDistance = Math.sin(Math.PI / 3) * bubbleDiameter
    var bubbleVisualRadius = bubbleRadius - 1 * dpp
    var bubbleVisualDiameter = bubbleVisualRadius * 2

    var classPrefix = 'MainPanel'

    var debugTickElement = document.createElement('div')

    var debugRepaintElement = document.createElement('div')

    var debugElement = document.createElement('div')
    debugElement.className = classPrefix + '-debug'
    debugElement.appendChild(debugRepaintElement)
    debugElement.appendChild(debugTickElement)

    var canvasWidth = width - width % bubbleDiameter
    var canvasHeight = height - height % bubbleDiameter

    var bubbleShapeBlack = BubbleShape_Black(bubbleVisualRadius),
        bubbleShapeBlue = BubbleShape_Blue(canvasHeight, bubbleVisualRadius),
        bubbleShapeGreen = BubbleShape_Green(canvasHeight, bubbleVisualRadius),
        bubbleShapeRed = BubbleShape_Red(canvasHeight, bubbleVisualRadius),
        bubbleShapeViolet = BubbleShape_Violet(canvasHeight, bubbleVisualRadius),
        bubbleShapeWhite = BubbleShape_White(canvasHeight, bubbleVisualRadius),
        bubbleShapeYellow = BubbleShape_Yellow(canvasHeight, bubbleVisualRadius)

    var nextBubbleRandomShape = RandomShape()
    nextBubbleRandomShape.add(1, bubbleShapeBlue)
    nextBubbleRandomShape.add(1, bubbleShapeGreen)
    nextBubbleRandomShape.add(1, bubbleShapeRed)
    nextBubbleRandomShape.add(1, bubbleShapeViolet)
    nextBubbleRandomShape.add(1, bubbleShapeWhite)
    nextBubbleRandomShape.add(1, bubbleShapeYellow)

    var shiftRandomShape = RandomShape()
    shiftRandomShape.add(2, bubbleShapeBlack)
    shiftRandomShape.add(5, bubbleShapeBlue)
    shiftRandomShape.add(5, bubbleShapeGreen)
    shiftRandomShape.add(5, bubbleShapeRed)
    shiftRandomShape.add(5, bubbleShapeViolet)
    shiftRandomShape.add(5, bubbleShapeWhite)
    shiftRandomShape.add(5, bubbleShapeYellow)

    var blurCanvas = BlurCanvas(canvasWidth, canvasHeight)

    var blurC = blurCanvas.c

    var background = Background(canvasWidth, canvasHeight, bubbleDiameter, dpp)

    var numBubblesHorizontal = Math.floor(width / bubbleDiameter)

    var breakingCanvas = BreakingCanvas(dpp)

    var fallingCanvas = FallingCanvas(dpp)

    var score = Score(canvasHeight, bubbleDiameter, dpp)

    var resultCanvas = ResultCanvas(canvasWidth, canvasHeight, dpp)

    var stillCanvas = StillCanvas(canvasHeight, bubbleRadius,
        numBubblesHorizontal, bubbleDiameter, shiftRandomShape.get,
        verticalDistance, breakingCanvas.add, fallingCanvas.add,
        score.add, function () {

        var scoreValue = score.get()
        resultCanvas.show(scoreValue, highScore)
        if (scoreValue > highScore) {
            highScore = scoreValue
            localStorage.highScore = highScore
        }

    })
    stillCanvas.reset()

    var movingCanvas = MovingCanvas(canvasWidth, canvasHeight,
        bubbleRadius, bubbleVisualDiameter, placeMovingBubble, dpp)

    var touchStarted = false,
        touchX, touchY

    var canvas = MainCanvas(width, height, dpp)

    var canvasOffsetX = (width - canvasWidth) / 2
    var canvasOffsetY = (height - canvasHeight) / 2

    var c = canvas.getContext('2d')
    c.translate(canvasOffsetX, canvasOffsetY)

    var minShootDY = 0.2

    var laser = Laser(canvasWidth, canvasHeight, bubbleRadius,
        bubbleVisualDiameter, c, minShootDY)

    var nextBubble = getNextBubble()
    var nextBubbleTimeout

    var highScore = parseInt(localStorage.highScore, 10)
    if (!isFinite(highScore)) highScore = 0

    var identifier = null

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(canvas)
    element.appendChild(debugElement)
    element.addEventListener('touchstart', function (e) {

        if (!nextBubble || !nextBubble.ready ||
            resultCanvas.showing || resultCanvas.hiding) return

        if (resultCanvas.visible) {
            resultCanvas.hide()
            stillCanvas.reset()
            score.reset()
            return
        }

        if (identifier === null) {
            var touch = e.changedTouches[0]
            touchX = touch.clientX * dpp - canvasOffsetX
            touchY = touch.clientY * dpp - canvasOffsetY
            identifier = touch.identifier
            touchStarted = true
        }

    })
    element.addEventListener('touchmove', function (e) {
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) {
                touchX = touch.clientX * dpp - canvasOffsetX
                touchY = touch.clientY * dpp - canvasOffsetY
            }
        }
    })
    element.addEventListener('touchend', function (e) {
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) {

                touchStarted = false

                var touch = e.changedTouches[0],
                    x = touchX - canvasWidth / 2,
                    y = canvasHeight - bubbleRadius - touchY,
                    distance = Math.hypot(x, y),
                    dx = x / distance,
                    dy = -y / distance

                if (dy < -minShootDY) {
                    var shape = nextBubble.shape
                    movingCanvas.add(shape, dx, dy)
                    nextBubble = null
                    nextBubbleTimeout = setTimeout(function () {
                        nextBubble = getNextBubble()
                    }, 200)
                    identifier = null
                }

            }
        }
    })

    var shot = 0
    var maxShots = 7

    addEventListener('keydown', function (e) {
        if (e.keyCode == 32) tick()
    })
    setInterval(tick, 20)

    repaint()

    return { element: element }

}
;
function MovingBubble (canvasWidth, canvasHeight,
    radius, visualDiameter, shape, dx, dy, dpp) {

    var stepMultiplier = 20 * dpp,
        stepX = dx * stepMultiplier,
        stepY = dy * stepMultiplier

    var that = {
        id: Math.random(),
        shape: shape,
        x: canvasWidth / 2,
        y: canvasHeight - radius,
        paint: function (c) {
            shape.paint(c, that.x, that.y)
        },
        shiftBack: function (distance) {

            var hypot = Math.hypot(dx, dy)
            that.x -= dx * distance / hypot
            that.y -= dy * distance / hypot

            var underflow = radius - that.x
            if (underflow > 0) that.x += 2 * underflow

            var overflow = that.x + radius - canvasWidth
            if (overflow > 0) that.x -= 2 * overflow


        },
        tick: function () {

            that.x += stepX
            that.y += stepY

            var underflow = radius - that.x
            if (underflow > 0) {
                that.x += 2 * underflow
                dx = -dx
                stepX = dx * stepMultiplier
            }

            var overflow = that.x + radius - canvasWidth
            if (overflow > 0) {
                that.x -= 2 * overflow
                dx = -dx
                stepX = dx * stepMultiplier
            }

            if (that.y <= radius) {
                that.y = radius
                return true
            }

        },
    }

    return that

}
;
function MovingCanvas (canvasWidth, canvasHeight,
    bubbleRadius, bubbleVisualDiameter, placeListener, dpp) {

    function remove (bubble) {
        delete movingBubbles[bubble.id]
    }

    var movingBubbles = {}

    return {
        movingBubbles: movingBubbles,
        remove: remove,
        add: function (shape, dx, dy) {
            var bubble = MovingBubble(canvasWidth, canvasHeight,
                bubbleRadius, bubbleVisualDiameter, shape, dx, dy, dpp)
            movingBubbles[bubble.id] = bubble
        },
        paint: function (c) {
            for (var i in movingBubbles) movingBubbles[i].paint(c)
        },
        tick: function () {
            for (var i in movingBubbles) {
                var bubble = movingBubbles[i]
                if (bubble.tick()) {
                    placeListener(bubble)
                    remove(bubble)
                }
            }
        },
    }

}
;
function Neighbors (bubble, columns) {

    function checkAndScan (colNumber, rowNumber) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble || scannedBubbles[bubble.id] || bubble.shape != shape) return

        scan(bubble)

    }

    function scan (bubble) {
        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        scannedBubbles[bubble.id] = bubble
        neighbors.push(bubble)
        checkAndScan(colNumber - 2, rowNumber)
        checkAndScan(colNumber + 2, rowNumber)
        checkAndScan(colNumber - 1, rowNumber - 1)
        checkAndScan(colNumber + 1, rowNumber - 1)
        checkAndScan(colNumber - 1, rowNumber + 1)
        checkAndScan(colNumber + 1, rowNumber + 1)
    }

    var columnsAndRows = {}
    for (var i in columns) {
        var bubbles = columns[i]
        columnsAndRows[i] = {}
        for (var j in bubbles) {
            var itemBubble = bubbles[j]
            columnsAndRows[i][itemBubble.rowNumber] = itemBubble
        }
    }

    var shape = bubble.shape
    var scannedBubbles = {}
    var neighbors = []
    scan(bubble)

    return neighbors

}
;
function NextBubble (canvasWidth, canvasHeight, bubbleRadius, shape) {

    var x = canvasWidth / 2,
        y = canvasHeight + bubbleRadius,
        maxSteps = 8,
        stepIndex = 0,
        stepSize = bubbleRadius * 2 / maxSteps

    var that = {
        ready: false,
        shape: shape,
        paint: function (c) {
            c.globalAlpha = stepIndex / maxSteps
            shape.paint(c, x, y)
            c.globalAlpha = 1
        },
        tick: function () {
            if (stepIndex < maxSteps) {
                stepIndex++
                y -= stepSize
            } else {
                that.ready = true
            }
        },
    }

    return that

}
;
function Orphans (columns) {

    function checkAndExclude (colNumber, rowNumber) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble) return

        var id = bubble.id
        if (scannedBubbles[id]) return

        scannedBubbles[id] = true
        delete orphans[id]
        checkChildren(bubble)

    }

    function checkChildren (bubble) {
        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        checkAndExclude(colNumber - 1, rowNumber - 1)
        checkAndExclude(colNumber + 1, rowNumber - 1)
        checkAndExclude(colNumber - 2, rowNumber)
        checkAndExclude(colNumber + 2, rowNumber)
        checkAndExclude(colNumber - 1, rowNumber + 1)
        checkAndExclude(colNumber + 1, rowNumber + 1)
    }

    var topBubbles = [],
        orphans = {},
        columnsAndRows = {}
    for (var i in columns) {
        var bubbles = columns[i]
        columnsAndRows[i] = {}
        for (var j in bubbles) {
            var bubble = bubbles[j]
            var rowNumber = bubble.rowNumber
            if (rowNumber) {
                columnsAndRows[i][rowNumber] = bubble
                orphans[bubble.id] = bubble
            } else {
                topBubbles.push(bubble)
            }
        }
    }

    var scannedBubbles = {}
    for (var i = 0; i < topBubbles.length; i++) {
        checkChildren(topBubbles[i])
    }

    return orphans

}
;
function RandomShape () {

    var outcomes = []
    var maxChance = 0

    return {
        add: function (chance, shape) {
            outcomes.push({
                chance: chance,
                shape: shape,
            })
            maxChance += chance
        },
        get: function () {
            var random = Math.random() * maxChance
            for (var i in outcomes) {
                var outcome = outcomes[i]
                random -= outcome.chance
                if (random < 0) return outcome.shape
            }
        },
    }

}
;
function RandomXY (minDistance, scale) {
    var angle = Math.random() * Math.PI * 2,
        distance = minDistance + Math.random() * scale,
        x = Math.cos(angle) * distance,
        y = Math.sin(angle) * distance
    return [x, y]
}
;
function ResultCanvas (canvasWidth, canvasHeight, dpp) {

    function hideTick () {
        if (index) index--
        if (!index) {
            that.visible = false
            that.hiding = false
        }
        ratio = index / maxIndex
    }

    function showTick () {
        if (index < maxIndex) index++
        else that.showing = false
        ratio = index / maxIndex
    }

    var index = 0,
        maxIndex = 24,
        ratio = 0,
        fontHeight = (26 * dpp),
        font = 'bold ' + fontHeight + 'px Arial, sans-serif'

    var score, highScore

    var that = {
        tick: showTick,
        hiding: false,
        showing: false,
        visible: false,
        hide: function () {
            that.showing = false
            that.tick = hideTick
            that.hiding = true
        },
        paint: function (c) {

            var ratioSqr = Math.pow(ratio, 1 / 4)

            c.fillStyle = 'rgba(0, 0, 0, ' + (ratioSqr * 0.7) + ')'
            c.fillRect(0, 0, canvasWidth, canvasHeight)

            var x = canvasWidth / 2
            var y = canvasHeight / 4 + canvasHeight * ratioSqr / 4 - fontHeight * 1.5
            c.translate(x, y)
            c.fillStyle = 'rgba(255, 255, 255, ' + ratioSqr + ')'
            c.textAlign = 'center'
            c.textBaseline = 'top'
            c.font = font
            c.fillText('YOUR SCORE: ' + score, 0, 0)
            if (score > highScore) {
                c.fillText('NEW RECORD!', 0, fontHeight * 2)
            } else {
                c.fillText('HIGH SCORE: ' + highScore, 0, fontHeight * 2)
            }
            c.translate(-x, -y)

        },
        show: function (_score, _highScore) {
            score = _score
            highScore = _highScore
            that.visible = true
            that.hiding = false
            that.tick = showTick
            that.showing = true
        },
    }

    return that

}
;
function StillBubble (x, y, shape, rowNumber, colNumber) {

    var that = {
        colNumber: colNumber,
        id: Math.random(),
        rowNumber: rowNumber,
        shape: shape,
        x: x,
        y: y,
        paint: function (c) {
            shape.paint(c, x, that.y)
        },
    }

    return that

}
;
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

                scoreListener(neighbors.length - breakNumber + 1)

                for (var i = 0; i < neighbors.length; i++) {
                    var neighbor = neighbors[i]
                    remove(neighbor)
                    breakCallback(neighbor.x, neighbor.y, neighbor.shape)
                }

                var orphans = Orphans(columns)
                for (var i in orphans) {
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
;
function Score (canvasHeight, bubbleDiameter, dpp) {

    var score = 0,
        x = 10 * dpp,
        y = canvasHeight - bubbleDiameter + 10 * dpp,
        font = 'bold ' + (26 * dpp) + 'px Arial, sans-serif'

    return {
        add: function (_score) {
            score += _score
        },
        get: function () {
            return score
        },
        paint: function (c) {
            c.textBaseline = 'top'
            c.font = font
            c.fillStyle = '#777'
            c.fillText(score, x, y)
        },
        reset: function () {
            score = 0
        },
    }

}
;
function BubbleShape_Black (radius) {

    var color = 'hsl(0, 0%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(0, 0%, 15%)', radius)

    return {
        color: color,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
;
function BubbleShape_Blue (canvasHeight, radius) {

    var color = 'hsl(220, 100%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(220, 100%, 55%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        laserGradient: LaserGradient(canvasHeight, c, 220, 100, 70),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
;
function BubbleShape_Canvas (lightColor, darkColor, radius) {

    var halfWidth = radius + 2

    var canvas = document.createElement('canvas')
    canvas.width = canvas.height = halfWidth * 2

    var c = canvas.getContext('2d')

    var minusHalfRadius = -radius / 2

    var gradient = c.createRadialGradient(0, minusHalfRadius, 0, 0, minusHalfRadius, radius * 2)
    gradient.addColorStop(0, lightColor)
    gradient.addColorStop(0.5, darkColor)
    gradient.addColorStop(1, lightColor)

    c.fillStyle = gradient
    c.translate(halfWidth, halfWidth)
    c.arc(0, 0, radius, 0, Math.PI * 2)
    c.fillStyle = gradient
    c.fill()

    return canvas

}
;
function BubbleShape_Green (canvasHeight, radius) {

    var color = 'hsl(100, 100%, 40%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(100, 100%, 30%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        laserGradient: LaserGradient(canvasHeight, c, 100, 100, 40),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
;
function BubbleShape_Red (canvasHeight, radius) {

    var color = 'hsl(5, 100%, 65%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(5, 100%, 40%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        laserGradient: LaserGradient(canvasHeight, c, 5, 100, 65),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
;
function BubbleShape_Violet (canvasHeight, radius) {

    var color = 'hsl(300, 100%, 60%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(300, 100%, 40%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        laserGradient: LaserGradient(canvasHeight, c, 300, 100, 60),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
;
function BubbleShape_White (canvasHeight, radius) {

    var color = 'hsl(0, 0%, 90%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(0, 0%, 70%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        laserGradient: LaserGradient(canvasHeight, c, 0, 0, 90),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
;
function BubbleShape_Yellow (canvasHeight, radius) {

    var color = 'hsl(60, 90%, 70%)'
    var halfWidth = radius + 2

    var canvas = BubbleShape_Canvas(color, 'hsl(60, 90%, 40%)', radius)
    var c = canvas.getContext('2d')

    return {
        color: color,
        laserGradient: LaserGradient(canvasHeight, c, 60, 90, 70),
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
;
(function () {
    var mainPanel = MainPanel()
    document.body.appendChild(mainPanel.element)
})()
;

})()