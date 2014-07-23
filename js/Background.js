function Background (canvasWidth, canvasHeight, bubbleDiameter) {

    var bubbleRadius = bubbleDiameter / 2

    var padding = 8
    var lineWidth = 4

    var height = bubbleDiameter + padding + lineWidth

    var canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = height

    var paddingRadius = bubbleRadius + padding

    var halfWidth = canvasWidth / 2

    var c = canvas.getContext('2d')
    c.lineJoin = c.lineCap = 'round'
    c.translate(halfWidth, height - bubbleRadius)
    c.moveTo(-halfWidth + lineWidth, 0)
    c.lineTo(-paddingRadius, 0)
    c.arc(0, 0, paddingRadius, Math.PI, 0)
    c.lineTo(paddingRadius, 0)
    c.lineTo(halfWidth - lineWidth, 0)
    c.strokeStyle = '#555'
    c.lineWidth = lineWidth
    c.stroke()

    var y = canvasHeight - height

    return {
        paint: function (c) {
            c.drawImage(canvas, 0, y)
        },
    }

}
