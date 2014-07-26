function LaserGradient (canvasHeight, c, h, s, l) {
    var hsl = h + ', ' + s + '%, ' + l + '%'
    var gradient = c.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, 'hsla(' + hsl + ', 0)')
    gradient.addColorStop(1, 'hsla(' + hsl + ', 0.2)')
    return gradient
}
