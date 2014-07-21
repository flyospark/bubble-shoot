function MainPanel () {

    function createBubbles (x, n, y) {
        for (var i = 0; i < n; i++) {
            var color = randomColor()
            var bubble = Bubble(bubbleRadius, x + i * bubbleDiameter, y, color)
            bubbles.push(bubble)
        }
    }

    function getNextBubble () {
        return Bubble(bubbleRadius, width / 2, height - bubbleRadius, randomColor())
    }

    function randomColor () {
        return colors[Math.floor(Math.random() * colors.length)]
    }

    function repaint () {
        c.clearRect(0, 0, canvas.width, canvas.height)
        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].paint(c)
        }
        nextBubble.paint(c)
        for (var i = 0; i < movingBubbles.length; i++) {
            movingBubbles[i].paint(c)
        }
    }

    var width = innerWidth
    var height = innerHeight
    var bubbleDiameter = 40
    var bubbleRadius = bubbleDiameter / 2
    var verticalDistance = Math.sin(Math.PI / 3) * bubbleDiameter

    var colors = ['#f22', '#0c0', '#07f', '#ee0', '#f7f']

    var classPrefix = 'MainPanel'

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = width - width % bubbleDiameter
    canvas.height = height - height % bubbleDiameter

    var numBubblesHorizontal = Math.floor(width / bubbleDiameter)

    var movingBubbles = []

    var odd = false
    var bubbles = []
    createBubbles(bubbleRadius, numBubblesHorizontal, bubbleRadius)
    createBubbles(bubbleDiameter, numBubblesHorizontal - 1, verticalDistance + bubbleRadius)
    createBubbles(bubbleRadius, numBubblesHorizontal, verticalDistance * 2 + bubbleRadius)

    var nextBubble = getNextBubble()

    var c = canvas.getContext('2d')

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(canvas)
    element.addEventListener('touchstart', function (e) {
        var touch = e.changedTouches[0],
            x = touch.clientX - width / 2,
            y = height - bubbleRadius - touch.clientY,
            distance = Math.hypot(x, y),
            sin = y / distance,
            cos = x / distance
        nextBubble.setDirection(cos, -sin)
        movingBubbles.push(nextBubble)
        nextBubble = getNextBubble()
    })

    setInterval(function () {
        requestAnimationFrame(function () {
            movingBubbles.forEach(function (bubble) {
                bubble.tick()
            })
            repaint()
        })
    }, 20)

    repaint()

    return { element: element }

}
