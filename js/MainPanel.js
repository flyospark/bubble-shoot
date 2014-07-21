function MainPanel () {

    function createBubbles (x, n, y) {
        for (var i = 0; i < n; i++) {
            var color = colors[Math.floor(Math.random() * colors.length)]
            var bubble = Bubble(bubbleRadius, x + i * bubbleDiameter, y, color)
            bubbles.push(bubble)
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

    var odd = false
    var bubbles = []
    createBubbles(bubbleRadius, numBubblesHorizontal, bubbleRadius)
    createBubbles(bubbleDiameter, numBubblesHorizontal - 1, verticalDistance + bubbleRadius)
    createBubbles(bubbleRadius, numBubblesHorizontal, verticalDistance * 2 + bubbleRadius)

    var c = canvas.getContext('2d')
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].paint(c)
    }

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(canvas)

    return { element: element }

}
