function MovingCanvas (canvasWidth, canvasHeight) {

    var movingBubbles = []

    var canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    var c = canvas.getContext('2d')

    return {
        canvas: canvas,
        movingBubbles: movingBubbles,
        add: function (movingBubble) {
            movingBubbles.push(movingBubble)
        },
        paint: function () {
            c.globalCompositeOperation = 'destination-out'
            c.fillStyle = 'rgba(255, 0, 0, 0.4)'
            c.fillRect(0, 0, canvasWidth, canvasHeight)
            c.globalCompositeOperation = 'source-over'
            for (var i = 0; i < movingBubbles.length; i++) {
                movingBubbles[i].paint(c)
            }
        },
        remove: function (movingBubble) {
            movingBubbles.splice(movingBubbles.indexOf(movingBubble), 1)
        },
        tick: function () {
            for (var i = 0; i < movingBubbles.length; i++) {
                movingBubbles[i].tick()
            }
        },
    }

}
