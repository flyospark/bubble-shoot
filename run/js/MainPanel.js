function MainPanel () {

    function getNextBubble () {
        var shape = nextBubbleRandomShape.get()
        return NextBubble(canvasWidth, canvasHeight, bubbleRadius, shape)
    }

    function pointerEnd () {

        var x = pointerX - canvasWidth / 2,
            y = canvasHeight - bubbleRadius - pointerY,
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
            pointerStarted = false
        }

    }

    function pointerHit () {

        if (!nextBubble || !nextBubble.ready ||
            resultCanvas.showing || resultCanvas.hiding) return true

        if (resultCanvas.visible) {
            resultCanvas.hide()
            stillCanvas.reset()
            score.reset()
            return true
        }

    }

    function pointerMove (e) {
        pointerX = e.clientX * dpp - canvasOffsetX
        pointerY = e.clientY * dpp - canvasOffsetY
    }

    function pointerStart (e) {
        pointerX = e.clientX * dpp - canvasOffsetX
        pointerY = e.clientY * dpp - canvasOffsetY
        pointerStarted = true
    }

    function repaint () {
        requestAnimationFrame(function () {

            var time = Date.now()

            blurCanvas.clear()
            c.clearRect(0, 0, canvasWidth, canvasHeight)
            background.paint(blurC)
            score.paint(blurC)
            stillCanvas.paint(blurC)
            if (pointerStarted) {
                laser.paint(blurC, pointerX, pointerY, nextBubble.shape.laserGradient)
            }
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
        bubbleShapeBlueBomb = BubbleShape_BlueBomb(bubbleVisualRadius),
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
    shiftRandomShape.add(1, bubbleShapeBlueBomb)
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

    var pointerStarted = false,
        pointerX, pointerY

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

    var touched = false

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(canvas)
    element.appendChild(debugElement)
    element.addEventListener('mousedown', function (e) {
        if (touched) touched = false
        else {
            if (pointerHit()) return
            if (!pointerStarted) pointerStart(e)
        }
    })
    element.addEventListener('touchstart', function (e) {
        if (pointerHit()) return
        if (!pointerStarted) {
            var touch = e.changedTouches[0]
            identifier = touch.identifier
            pointerStart(touch)
        }
    })
    element.addEventListener('mousemove', function (e) {
        if (touched) touched = false
        else pointerMove(e)
    })
    element.addEventListener('touchmove', function (e) {
        touched = true
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) pointerMove(touch)
        }
    })
    element.addEventListener('mouseup', function (e) {
        if (touched) touched = false
        else pointerEnd(e)
    })
    element.addEventListener('touchend', function (e) {
        touched = true
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) pointerEnd(touch)
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
