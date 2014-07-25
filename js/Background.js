function Background (width, canvasHeight, bubbleDiameter) {

    var bubbleRadius = bubbleDiameter / 2

    var padding = 8
    var lineWidth = 4
    var lineY = bubbleRadius - lineWidth / 2
    var paddedRadius = bubbleRadius + padding
    var angle = Math.asin(lineY / paddedRadius)
    var cos = Math.sqrt(1 - Math.pow(lineY / paddedRadius, 2)) * paddedRadius
    var height = bubbleDiameter + padding + lineWidth
    var halfWidth = width / 2

    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    var c = canvas.getContext('2d')
    c.lineJoin = c.lineCap = 'round'
    c.translate(halfWidth, height - bubbleRadius)
    c.moveTo(-halfWidth + lineWidth, -lineY)
    c.lineTo(-cos, -lineY)
    c.arc(0, 0, paddedRadius, -Math.PI + angle, -angle)
    c.lineTo(halfWidth - lineWidth, -lineY)
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
