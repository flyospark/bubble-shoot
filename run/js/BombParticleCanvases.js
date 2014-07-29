function BombParticleCanvases (scale, color) {

    var maxRadius = scale * 6
    var steps = 24

    var canvases = []
    for (var i = 0; i < steps; i++) {

        var radius = maxRadius * (steps - i) / steps
        var canvasRadius = radius + 1

        var canvas = document.createElement('canvas')
        canvas.width = canvas.height = canvasRadius * 2

        var c = canvas.getContext('2d')
        c.fillStyle = color
        c.translate(canvasRadius, canvasRadius)
        c.arc(0, 0, radius, 0, Math.PI * 2)
        c.fill()

        canvases.push(canvas)

    }
    return canvases

}
