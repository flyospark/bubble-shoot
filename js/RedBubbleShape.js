function RedBubbleShape (c, radius) {

    var halfRadius = radius / 2
    var circleRadius = radius - 0.5
    var fullCircle = Math.PI * 2

    var gradient = c.createRadialGradient(0, -halfRadius, 0, 0, -halfRadius, radius)
    gradient.addColorStop(0, 'hsl(5, 100%, 65%)')
    gradient.addColorStop(1, 'hsl(5, 100%, 40%)')

    return {
        paint: function (c, x, y) {
            c.save()
            c.translate(x, y)
            c.fillStyle = gradient
            c.beginPath()
            c.arc(0, 0, circleRadius, 0, fullCircle)
            c.fill()
            c.restore()
        },
    }

}
