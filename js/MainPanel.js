function MainPanel () {

    function createBubbles (x, n) {
        for (var i = 0; i < n; i++) {
            var bubbleX = x + i * bubbleDiameter
            var shape = randomShape()
            bubbles.push(Bubble(canvasWidth, bubbleX, bubbleRadius, shape))
        }
    }

    function getNextBubble () {
        var shape = randomShape()
        return NextBubble(canvasWidth, canvasHeight, bubbleRadius, shape)
    }

    function init () {
        bubbles.splice(0)
        shift()
        shift()
        shift()
    }

    function randomShape () {
        return shapes[Math.floor(Math.random() * shapes.length)]
    }

    function repaint () {
        requestAnimationFrame(function () {
            c.fillStyle = '#000'
            c.fillRect(0, 0, canvasWidth, canvasHeight)
            for (var i = 0; i < bubbles.length; i++) {
                bubbles[i].paint(c)
            }
            nextBubble.paint(c)
            movingCanvas.paint()
            c.drawImage(movingCanvas.canvas, 0, 0)
        })
    }

    function shift () {

        for (var i = 0; i < bubbles.length; i++) {
            var bubble = bubbles[i]
            bubble.setY(bubble.getY() + verticalDistance)
        }

        if (odd) {
            createBubbles(bubbleDiameter, numBubblesHorizontal - 1)
            odd = false
        } else {
            createBubbles(bubbleRadius, numBubblesHorizontal)
            odd = true
        }

    }

    var width = innerWidth
    var height = innerHeight
    var bubbleDiameter = 40
    var bubbleRadius = bubbleDiameter / 2
    var verticalDistance = Math.sin(Math.PI / 3) * bubbleDiameter

    var classPrefix = 'MainPanel'

    var canvasWidth = width - width % bubbleDiameter
    var canvasHeight = height - height % bubbleDiameter

    var bubbles = []
    var odd = false

    var movingCanvas = MovingCanvas(canvasWidth, canvasHeight, bubbles, bubbleRadius, verticalDistance, bubbleDiameter, init)

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var numBubblesHorizontal = Math.floor(width / bubbleDiameter)

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

        movingCanvas.tick(bubbles)


        repaint()

    }, 10)

    repaint()

    return { element: element }

}
