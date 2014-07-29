function BreakingBubble (x, y, shape, scale) {

    var maxSteps = 16
    var stepIndex = maxSteps
    var fullCircle = Math.PI * 2

    var doubleScale = 2 * scale
    var particles = []
    for (var i = 0; i < 6; i++) {
        var locationXY = RandomXY(doubleScale, doubleScale)
        var directionXY = RandomXY(doubleScale, doubleScale)
        particles.push({
            x: x + locationXY[0],
            y: y + locationXY[1],
            dx: directionXY[0],
            dy: directionXY[1],
        })
    }

    var radius = 8 * scale

    return {
        id: Math.random(),
        paint: function (c) {

            if (stepIndex == maxSteps) shape.paint(c, x, y)

            for (var i in particles) {
                var particle = particles[i],
                    px = particle.x,
                    py = particle.y
                c.beginPath()
                c.moveTo(px, py)
                c.fillStyle = shape.color
                c.arc(px, py, radius, 0, fullCircle)
                c.fill()
            }

        },
        tick: function () {

            for (var i in particles) {
                var particle = particles[i]
                particle.x += particle.dx
                particle.y += particle.dy
            }

            stepIndex--
            if (!stepIndex) return true

            radius = 8 * scale * stepIndex / maxSteps

        },
    }

}
