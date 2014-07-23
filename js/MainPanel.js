function MainPanel () {

    function getNextBubble () {
        var shape = nextRandomShape()
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

    function repaint () {
        requestAnimationFrame(function () {

            var text = ''
            var time = Date.now()

            blurCanvas.clear()
            newTime = Date.now()
            text += ' a' + (newTime - time)
            time = newTime

            c.clearRect(0, 0, canvasWidth, canvasHeight)
            newTime = Date.now()
            text += ' b' + (newTime - time)
            time = newTime

            background.paint(blurC)
            newTime = Date.now()
            text += ' c' + (newTime - time)
            time = newTime

            stillCanvas.paint(blurC)
            newTime = Date.now()
            text += ' d' + (newTime - time)
            time = newTime

            if (nextBubble) nextBubble.paint(blurC)
            newTime = Date.now()
            text += ' e' + (newTime - time)
            time = newTime

            movingCanvas.paint(blurC)
            newTime = Date.now()
            text += ' f' + (newTime - time)
            time = newTime

            c.drawImage(blurCanvas.canvas, 0, 0)
            newTime = Date.now()
            text += ' g' + (newTime - time)
            time = newTime

            debugRepaintElement.innerHTML = 'repaint:' + text

        })
    }

    var width = innerWidth
    var height = innerHeight
    var bubbleDiameter = 40
    var bubbleRadius = bubbleDiameter / 2
    var verticalDistance = Math.sin(Math.PI / 3) * bubbleDiameter

    var nextRandomShape = BubbleShape_Random(bubbleRadius).next

    var classPrefix = 'MainPanel'

    var debugTickElement = document.createElement('div')

    var debugRepaintElement = document.createElement('div')

    var debugElement = document.createElement('div')
    debugElement.className = classPrefix + '-debug'
    debugElement.appendChild(debugRepaintElement)
    debugElement.appendChild(debugTickElement)

    var canvasWidth = width - width % bubbleDiameter
    var canvasHeight = height - height % bubbleDiameter

    var blurCanvas = BlurCanvas(canvasWidth, canvasHeight)

    var blurC = blurCanvas.c

    var background = Background(canvasWidth, canvasHeight, bubbleDiameter)

    var numBubblesHorizontal = Math.floor(width / bubbleDiameter)

    var stillCanvas = StillCanvas(canvasWidth, canvasHeight, bubbleRadius,
        numBubblesHorizontal, bubbleDiameter, nextRandomShape, verticalDistance)

    var movingCanvas = MovingCanvas()

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    var nextBubble
    var nextBubbleTimeout

    init()

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(canvas)
    element.appendChild(debugElement)
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
        }, 200)
        repaint()
    })

    setInterval(function () {

        var time = Date.now()

        stillCanvas.tick()
        movingCanvas.tick()
        if (nextBubble) nextBubble.tick()

        var collisions = Collide(movingCanvas.movingBubbles,
            stillCanvas.stillBubbles, bubbleRadius, verticalDistance,
            canvasWidth, canvasHeight, stillCanvas, bubbleDiameter, init)

        for (var i = 0; i < collisions.length; i++) {
            var collision = collisions[i]
            var movingBubble = collision.movingBubble
            movingBubble.shiftBack(bubbleDiameter - collision.distance)
            stillCanvas.add(movingBubble)
            movingCanvas.remove(movingBubble)
        }

        debugTickElement.innerHTML = 'tick ' + (Date.now() - time)

        repaint()

    }, 20)

    repaint()

    return { element: element }

}
