function Laser (canvasWidth, canvasHeight, bubbleRadius, thinkness, c) {

    var gradient = c.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)')

    return {
        paint: function (c, x, y) {
            c.beginPath()
            c.moveTo(x, y)
            c.lineCap = 'round'
            c.lineTo(canvasWidth / 2, canvasHeight - bubbleRadius)
            c.lineWidth = thinkness
            c.strokeStyle = gradient
            c.stroke()
        },
    }

}
