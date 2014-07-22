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
    }

    function randomShape () {
        return shapes[Math.floor(Math.random() * shapes.length)]
    }

    function repaint () {
        requestAnimationFrame(function () {

            c.clearRect(0, 0, canvasWidth, canvasHeight)

            stillCanvas.paint()
            c.drawImage(stillCanvas.canvas, 0, 0)

            nextBubble.paint(c)

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
        stillCanvas.stillBubbles, bubbleRadius, verticalDistance, bubbleDiameter, init, stillCanvas)

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    var shapes = [
        RedBubbleShape(c, bubbleRadius),
        GreenBubbleShape(c, bubbleRadius),
        BlueBubbleShape(c, bubbleRadius),
        VioletBubbleShape(c, bubbleRadius),
        YellowBubbleShape(c, bubbleRadius)]

    init()

    var nextBubble = getNextBubble()

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(canvas)
    element.addEventListener('touchstart', function (e) {
        var touch = e.changedTouches[0],
            x = touch.clientX - width / 2,
            y = height - bubbleRadius - touch.clientY,
            distance = Math.hypot(x, y),
            dx = x / distance,
            dy = -y / distance,
            shape = nextBubble.shape
        movingCanvas.add(MovingBubble(canvasWidth, canvasHeight, bubbleRadius, shape, dx, dy))
        nextBubble = getNextBubble()
    })

    setInterval(function () {
        stillCanvas.tick()
        movingCanvas.tick()
        repaint()
    }, 10)

    repaint()

    return { element: element }

}
