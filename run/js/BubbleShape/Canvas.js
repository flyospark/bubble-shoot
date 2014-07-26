function BubbleShape_Canvas (lightColor, darkColor, radius) {

    var halfWidth = radius + 2

    var canvas = document.createElement('canvas')
    canvas.width = canvas.height = halfWidth * 2

    var c = canvas.getContext('2d')

    var minusHalfRadius = -radius / 2

    var gradient = c.createRadialGradient(0, minusHalfRadius, 0, 0, minusHalfRadius, radius * 2)
    gradient.addColorStop(0, lightColor)
    gradient.addColorStop(0.5, darkColor)
    gradient.addColorStop(1, lightColor)

    c.fillStyle = gradient
    c.translate(halfWidth, halfWidth)
    c.arc(0, 0, radius, 0, Math.PI * 2)
    c.fillStyle = gradient
    c.fill()

    return canvas

}
