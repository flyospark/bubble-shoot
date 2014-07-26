function Background (width, canvasHeight, bubbleDiameter, dpp) {

    var bubbleRadius = bubbleDiameter / 2,
        padding = 8 * dpp,
        lineWidth = 4 * dpp,
        lineY = bubbleRadius - lineWidth / 2,
        paddedRadius = bubbleRadius + padding,
        angle = Math.asin(lineY / paddedRadius),
        cos = Math.sqrt(1 - Math.pow(lineY / paddedRadius, 2)) * paddedRadius,
        height = bubbleDiameter + padding + lineWidth,
        halfWidth = width / 2,
        y = canvasHeight - height

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

    return {
        paint: function (c) {
            c.drawImage(canvas, 0, y)
        },
    }

}
