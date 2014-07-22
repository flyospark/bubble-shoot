function MainPanel () {

    function getNextBubble () {
        var shape = randomShape()
        return NextBubble(canvasWidth, canvasHeight, bubbleRadius, shape)
    }

    function init () {
        stillCanvas.removeAll()
        stillCanvas.shift()
        stillCanvas.shift()
        stillCanvas.shift()
        if (!nextBubble) {
            clearTimeout(nextBubbleTimeout)
            nextBubble = getNextBubble()
        }
    }

    function randomShape () {
        return shapes[Math.floor(Math.random() * shapes.length)]
    }

    function repaint () {
        requestAnimationFrame(function () {

            c.clearRect(0, 0, canvasWidth, canvasHeight)

            stillCanvas.paint()
            c.drawImage(stillCanvas.canvas, 0, 0)

            if (nextBubble) nextBubble.paint(c)

            movingCanvas.paint()
            c.drawImage(movingCanvas.canvas, 0, 0)

        })
    }

    var width = innerWidth
    var height = innerHeight
    var bubbleDiameter = 40
    var bubbleRadius = bubbleDiameter / 2
    var verticalDistance = Math.sin(Math.PI / 3) * bubbleDiameter

    var classPrefix = 'MainPanel'

    var canvasWidth = width - width % bubbleDiameter
    var canvasHeight = height - height % bubbleDiameter

    var numBubblesHorizontal = Math.floor(width / bubbleDiameter)

    var stillCanvas = StillCanvas(canvasWidth, canvasHeight, bubbleRadius,
        numBubblesHorizontal, bubbleDiameter, randomShape, verticalDistance)

    var movingCanvas = MovingCanvas(canvasWidth, canvasHeight,
        stillCanvas.stillBubbles, bubbleRadius, verticalDistance,
        bubbleDiameter, init, stillCanvas, function (stillBubble) {
        stillCanvas.add(stillBubble)
    })

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    var shapes = [
        RedBubbleShape(bubbleRadius),
        GreenBubbleShape(bubbleRadius),
        BlueBubbleShape(bubbleRadius),
        VioletBubbleShape(bubbleRadius),
        YellowBubbleShape(bubbleRadius),
    ]

    var nextBubble
    var nextBubbleTimeout

    init()

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(canvas)
    element.addEventListener('touchstart', function (e) {
        if (!nextBubble || !nextBubble.ready) return
        var touch = e.changedTouches[0],
            x = touch.clientX - width / 2,
            y = height - bubbleRadius - touch.clientY,
            distance = Math.hypot(x, y),
            dx = x / distance,
            dy = -y / distance,
            shape = nextBubble.shape
        movingCanvas.add(MovingBubble(canvasWidth, canvasHeight, bubbleRadius, shape, dx, dy))
        nextBubble = null
        nextBubbleTimeout = setTimeout(function () {
            nextBubble = getNextBubble()
        }, 100)
    })

    setInterval(function () {
        stillCanvas.tick()
        movingCanvas.tick()
        if (nextBubble) nextBubble.tick()
        repaint()
    }, 10)

    repaint()

    return { element: element }

}
