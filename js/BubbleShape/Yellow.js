function BubbleShape_Yellow (radius) {

    var color = 'hsl(50, 100%, 70%)'

    var canvas = (function () {

        var diameter = radius * 2

        var canvas = document.createElement('canvas')
        canvas.width = canvas.height = diameter

        var c = canvas.getContext('2d')

        var minusHalfRadius = -radius / 2

        var gradient = c.createRadialGradient(0, minusHalfRadius, 0, 0, minusHalfRadius, diameter)
        gradient.addColorStop(0, color)
        gradient.addColorStop(0.5, 'hsl(50, 100%, 40%)')
        gradient.addColorStop(1, color)

        c.fillStyle = gradient
        c.translate(radius, radius)
        c.arc(0, 0, radius, 0, Math.PI * 2)
        c.fillStyle = gradient
        c.fill()

        return canvas

    })()

    return {
        color: color,
        paint: function (c, x, y) {
            c.drawImage(canvas, x - radius, y - radius)
        },
    }

}
