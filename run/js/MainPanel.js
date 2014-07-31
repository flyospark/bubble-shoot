function MainPanel () {

    function getNextBubble () {
        var shape = nextBubbleRandomShape.get()
        return NextBubble(canvasWidth, canvasHeight, bubbleRadius, shape)
    }

    function pointerEnd () {

        if (!pointerStarted) return

        var x = pointerX - canvasWidth / 2,
            y = canvasHeight - bubbleRadius - pointerY,
            distance = Math.sqrt(x * x + y * y),
            dx = x / distance,
            dy = -y / distance

        if (dy < -minShootDY && nextBubble && nextBubble.ready) {
            var shape = nextBubble.shape
            movingCanvas.add(shape, dx, dy)
            nextBubble = null
            nextBubbleTimeout = 10
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

    function restoreBubble (bubbleData) {
        var property
        if (bubbleData.isBomb) property = 'bomb'
        else property = 'normal'
        return shapeMap[bubbleData.colorName][property]
    }

    function saveState () {
        localStorage.state = JSON.stringify({
            width: width,
            height: height,
            dpp: dpp,
            score: score.get(),
            stillCanvas: stillCanvas.getData(),
            nextBubbleColorName: nextBubble ? nextBubble.shape.colorName : null,
            nextBubbleIsInjection: nextBubble ? nextBubble.shape.isInjection : null,
        })
    }

    function tick () {
        for (var i = 0; i < 2; i++) {

            var time = Date.now()

            stillCanvas.tick()
            movingCanvas.tick()
            breakingCanvas.tick()
            fallingCanvas.tick()
            if (resultCanvas.visible) resultCanvas.tick()

            var collisions = Collide(movingCanvas.movingBubbles,
                stillCanvas.stillBubbles, bubbleVisualDiameter)

            for (var j = 0; j < collisions.length; j++) {
                var collision = collisions[j]
                var movingBubble = collision.movingBubble
                movingBubble.shiftBack(bubbleDiameter - collision.distance)
                placeMovingBubble(movingBubble)
                movingCanvas.remove(movingBubble)
            }

            if (nextBubbleTimeout) {
                nextBubbleTimeout--
                if (!nextBubbleTimeout) nextBubble = getNextBubble()
            } else {
                if (nextBubble) nextBubble.tick()
            }

            debugTickElement.innerHTML = 'tick ' + (Date.now() - time)

        }
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

    var numBubblesHorizontal = 9 + Math.floor((width - 300) / 150)
    var bubbleDiameter = Math.floor(width / numBubblesHorizontal)
    var scale = bubbleDiameter / 40
    var bubbleRadius = bubbleDiameter / 2
    var verticalDistance = Math.sin(Math.PI / 3) * bubbleDiameter
    var bubbleVisualRadius = bubbleRadius - 1 * scale
    var bubbleVisualDiameter = bubbleVisualRadius * 2

    var canvasWidth = width - width % bubbleDiameter
    var canvasHeight = height - height % bubbleDiameter

    var classPrefix = 'MainPanel'

    var debugTickElement = document.createElement('div')

    var debugRepaintElement = document.createElement('div')

    var debugElement = document.createElement('div')
    debugElement.className = classPrefix + '-debug'
    debugElement.appendChild(debugRepaintElement)
    debugElement.appendChild(debugTickElement)

    var blackBubbleShape = BubbleShape_Black(bubbleVisualRadius, scale),
        blueBubbleShape = BubbleShape_Blue(canvasHeight, bubbleVisualRadius, scale),
        blueBombBubbleShape = BubbleShape_BlueBomb(bubbleVisualRadius, scale),
        greenBubbleShape = BubbleShape_Green(canvasHeight, bubbleVisualRadius, scale),
        greenBombBubbleShape = BubbleShape_GreenBomb(bubbleVisualRadius, scale),
        redBubbleShape = BubbleShape_Red(canvasHeight, bubbleVisualRadius, scale),
        redBombBubbleShape = BubbleShape_RedBomb(bubbleVisualRadius, scale),
        violetBubbleShape = BubbleShape_Violet(canvasHeight, bubbleVisualRadius, scale),
        violetBombBubbleShape = BubbleShape_VioletBomb(bubbleVisualRadius, scale),
        whiteBubbleShape = BubbleShape_White(canvasHeight, bubbleVisualRadius, scale),
        whiteBombBubbleShape = BubbleShape_WhiteBomb(bubbleVisualRadius, scale),
        yellowBubbleShape = BubbleShape_Yellow(canvasHeight, bubbleVisualRadius, scale),
        yellowBombBubbleShape = BubbleShape_YellowBomb(bubbleVisualRadius, scale)

    var blueInjectionBubbleShape = BubbleShape_BlueInjection(canvasHeight, bubbleVisualRadius, scale)
    blueInjectionBubbleShape.laserGradient = blueBubbleShape.laserGradient
    blueInjectionBubbleShape.getParticleCanvases = blueBubbleShape.getParticleCanvases
    blueInjectionBubbleShape.normalShape = blueBubbleShape

    var greenInjectionBubbleShape = BubbleShape_GreenInjection(canvasHeight, bubbleVisualRadius, scale)
    greenInjectionBubbleShape.laserGradient = greenBubbleShape.laserGradient
    greenInjectionBubbleShape.getParticleCanvases = greenBubbleShape.getParticleCanvases
    greenInjectionBubbleShape.normalShape = greenBubbleShape

    var redInjectionBubbleShape = BubbleShape_RedInjection(canvasHeight, bubbleVisualRadius, scale)
    redInjectionBubbleShape.laserGradient = redBubbleShape.laserGradient
    redInjectionBubbleShape.getParticleCanvases = redBubbleShape.getParticleCanvases
    redInjectionBubbleShape.normalShape = redBubbleShape

    var violetInjectionBubbleShape = BubbleShape_VioletInjection(canvasHeight, bubbleVisualRadius, scale)
    violetInjectionBubbleShape.laserGradient = violetBubbleShape.laserGradient
    violetInjectionBubbleShape.getParticleCanvases = violetBubbleShape.getParticleCanvases
    violetInjectionBubbleShape.normalShape = violetBubbleShape

    var whiteInjectionBubbleShape = BubbleShape_WhiteInjection(canvasHeight, bubbleVisualRadius, scale)
    whiteInjectionBubbleShape.laserGradient = whiteBubbleShape.laserGradient
    whiteInjectionBubbleShape.getParticleCanvases = whiteBubbleShape.getParticleCanvases
    whiteInjectionBubbleShape.normalShape = whiteBubbleShape

    var yellowInjectionBubbleShape = BubbleShape_YellowInjection(canvasHeight, bubbleVisualRadius, scale)
    yellowInjectionBubbleShape.laserGradient = yellowBubbleShape.laserGradient
    yellowInjectionBubbleShape.getParticleCanvases = yellowBubbleShape.getParticleCanvases
    yellowInjectionBubbleShape.normalShape = yellowBubbleShape

    var allParticleCanvases = blackBubbleShape.getParticleCanvases(1)
        .concat(blueBubbleShape.getParticleCanvases(1))
        .concat(greenBubbleShape.getParticleCanvases(1))
        .concat(redBubbleShape.getParticleCanvases(1))
        .concat(violetBubbleShape.getParticleCanvases(1))
        .concat(whiteBubbleShape.getParticleCanvases(1))
        .concat(yellowBubbleShape.getParticleCanvases(1))

    var anyColorBubbleShape = BubbleShape_AnyColor(bubbleVisualRadius, allParticleCanvases)

    var shapeMap = {
        anyColor: { normal: anyColorBubbleShape },
        black: { normal: blackBubbleShape },
        blue: {
            normal: blueBubbleShape,
            bomb: blueBombBubbleShape,
            injection: blueInjectionBubbleShape,
        },
        green: {
            normal: greenBubbleShape,
            bomb: greenBombBubbleShape,
            injection: greenInjectionBubbleShape,
        },
        red: {
            normal: redBubbleShape,
            bomb: redBombBubbleShape,
            injection: redInjectionBubbleShape,
        },
        violet: {
            normal: violetBubbleShape,
            bomb: violetBombBubbleShape,
            injection: violetInjectionBubbleShape,
        },
        white: {
            normal: whiteBubbleShape,
            bomb: whiteBombBubbleShape,
            injection: whiteInjectionBubbleShape,
        },
        yellow: {
            normal: yellowBubbleShape,
            bomb: yellowBombBubbleShape,
            injection: yellowInjectionBubbleShape,
        },
    }

    var nextBubbleRandomShape = RandomShape()
    nextBubbleRandomShape.add(2, anyColorBubbleShape)
    nextBubbleRandomShape.add(27, blueBubbleShape)
    nextBubbleRandomShape.add(1, blueInjectionBubbleShape)
    nextBubbleRandomShape.add(27, greenBubbleShape)
    nextBubbleRandomShape.add(1, greenInjectionBubbleShape)
    nextBubbleRandomShape.add(27, redBubbleShape)
    nextBubbleRandomShape.add(1, redInjectionBubbleShape)
    nextBubbleRandomShape.add(27, violetBubbleShape)
    nextBubbleRandomShape.add(1, violetInjectionBubbleShape)
    nextBubbleRandomShape.add(27, whiteBubbleShape)
    nextBubbleRandomShape.add(1, whiteInjectionBubbleShape)
    nextBubbleRandomShape.add(27, yellowBubbleShape)
    nextBubbleRandomShape.add(1, yellowInjectionBubbleShape)

    var shiftRandomShape = RandomShape()
    shiftRandomShape.add(6, blackBubbleShape)
    shiftRandomShape.add(13, blueBubbleShape)
    shiftRandomShape.add(1, blueBombBubbleShape)
    shiftRandomShape.add(13, greenBubbleShape)
    shiftRandomShape.add(1, greenBombBubbleShape)
    shiftRandomShape.add(13, redBubbleShape)
    shiftRandomShape.add(1, redBombBubbleShape)
    shiftRandomShape.add(13, violetBubbleShape)
    shiftRandomShape.add(1, violetBombBubbleShape)
    shiftRandomShape.add(13, whiteBubbleShape)
    shiftRandomShape.add(1, whiteBombBubbleShape)
    shiftRandomShape.add(13, yellowBubbleShape)
    shiftRandomShape.add(1, yellowBombBubbleShape)

    var blurCanvas = BlurCanvas(canvasWidth, canvasHeight)

    var blurC = blurCanvas.c

    var background = Background(canvasWidth, canvasHeight, bubbleDiameter, scale)

    var breakingCanvas = BreakingCanvas(scale)

    var fallingCanvas = FallingCanvas(scale)

    var score = Score(canvasHeight, bubbleDiameter, scale)

    var resultCanvas = ResultCanvas(canvasWidth, canvasHeight, scale)

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
        bubbleRadius, bubbleVisualDiameter, placeMovingBubble, scale)

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
    var nextBubbleTimeout = 0

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
    addEventListener('mousemove', function (e) {
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
    addEventListener('mouseup', function (e) {
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

    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState == 'hidden') saveState()
    })

    addEventListener('beforeunload', saveState)
    addEventListener('keydown', function (e) {
        if (e.keyCode == 32) tick()
    })
    setInterval(tick, 30)

    repaint()

    ;(function () {

        var state = localStorage.state
        if (!state) return

        var data = JSON.parse(state)
        if (data.width != width || data.height != height || data.dpp != dpp) return

        score.add(data.score)
        stillCanvas.setData(data.stillCanvas, restoreBubble)

        var nextBubbleColorName = data.nextBubbleColorName
        if (nextBubbleColorName) {
            var shape
            if (data.nextBubbleIsInjection) {
                shape = shapeMap[nextBubbleColorName].injection
            } else {
                shape = shapeMap[nextBubbleColorName].normal
            }
            nextBubble = NextBubble(canvasWidth, canvasHeight, bubbleRadius, shape)
        }

    })()

    return { element: element }

}
