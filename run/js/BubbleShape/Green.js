function BubbleShape_Green (canvasHeight, radius) {

    var color = 'hsl(100, 100%, 40%)'
    var halfWidth = radius + 2

    var laserGradient

    var canvas = (function () {

        var canvas = document.createElement('canvas')
        canvas.width = canvas.height = halfWidth * 2

        var c = canvas.getContext('2d')

        var minusHalfRadius = -radius / 2

        var gradient = c.createRadialGradient(0, minusHalfRadius, 0, 0, minusHalfRadius, radius * 2)
        gradient.addColorStop(0, color)
        gradient.addColorStop(0.5, 'hsl(100, 100%, 30%)')
        gradient.addColorStop(1, color)

        c.fillStyle = gradient
        c.translate(halfWidth, halfWidth)
        c.arc(0, 0, radius, 0, Math.PI * 2)
        c.fillStyle = gradient
        c.fill()

        laserGradient = LaserGradient(canvasHeight, c, 100, 100, 40)

        return canvas

    })()

    return {
        color: color,
        laserGradient: laserGradient,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfWidth, y - halfWidth)
        },
    }

}
