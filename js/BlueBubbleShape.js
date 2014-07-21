function BlueBubbleShape (c, radius) {

    var halfRadius = radius / 2

    var gradient = c.createRadialGradient(0, -halfRadius, 0, 0, -halfRadius, radius)
    gradient.addColorStop(0, 'hsl(220, 100%, 70%)')
    gradient.addColorStop(1, 'hsl(220, 100%, 55%)')

    return {
        paint: function (c, x, y) {
            c.save()
            c.translate(x, y)
            c.fillStyle = gradient
            c.beginPath()
            c.arc(0, 0, radius - 0.5, 0, Math.PI * 2)
            c.fill()
            c.restore()
        },
    }

}
