function Laser (canvasWidth, canvasHeight, bubbleRadius, thinkness, c, minShootDY) {

    var radius = Math.max(canvasWidth, canvasHeight) * 2

    var bubbleX = canvasWidth / 2,
        bubbleY = canvasHeight - bubbleRadius

    return {
        paint: function (c, x, y, gradient) {

            var touchX = x - bubbleX,
                touchY = y - bubbleY,
                touchHypot = Math.sqrt(touchX * touchX + touchY * touchY),
                endX = touchX * radius / touchHypot,
                endY = touchY * radius / touchHypot

            if (touchY / touchHypot < -minShootDY) {
                c.beginPath()
                c.moveTo(bubbleX, bubbleY)
                c.lineTo(bubbleX + endX, bubbleY + endY)
                c.lineWidth = thinkness
                c.lineCap = 'round'
                c.strokeStyle = gradient
                c.stroke()
            }

        },
    }

}
