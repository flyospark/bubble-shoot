function Laser (canvasWidth, canvasHeight, bubbleRadius, thinkness, c) {

    var gradient = c.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)')

    var radius = Math.max(canvasWidth, canvasHeight) * 2

    var bubbleX = canvasWidth / 2,
        bubbleY = canvasHeight - bubbleRadius

    return {
        paint: function (c, x, y) {

            var touchX = x - bubbleX,
                touchY = y - bubbleY,
                touchHypot = Math.hypot(touchX, touchY),
                endX = touchX * radius / touchHypot,
                endY = touchY * radius / touchHypot

            c.beginPath()
            c.moveTo(bubbleX, bubbleY)
            c.lineTo(bubbleX + endX, bubbleY + endY)
            c.lineWidth = thinkness
            c.lineCap = 'round'
            c.strokeStyle = gradient
            c.stroke()

        },
    }

}
