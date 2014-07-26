function BreakingBubble (x, y, shape, dpp) {

    var maxSteps = 16
    var stepIndex = maxSteps
    var fullCircle = Math.PI * 2

    var particles = []
    for (var i = 0; i < 6; i++) {
        var locationXY = RandomXY(2 * dpp, 2 * dpp)
        var displacementXY = RandomXY(2 * dpp, 2 * dpp)
        particles.push({
            x: x + locationXY[0],
            y: y + locationXY[1],
            dx: displacementXY[0],
            dy: displacementXY[1],
        })
    }

    return {
        id: Math.random(),
        paint: function (c) {

            if (stepIndex == maxSteps) shape.paint(c, x, y)

            for (var i = 0; i < particles.length; i++) {
                var particle = particles[i],
                    px = particle.x,
                    py = particle.y
                c.beginPath()
                c.moveTo(px, py)
                c.fillStyle = shape.color
                c.arc(px, py, 4 * stepIndex / maxSteps * dpp, 0, fullCircle)
                c.fill()
            }

        },
        tick: function () {

            for (var i = 0; i < particles.length; i++) {
                var particle = particles[i]
                particle.x += particle.dx
                particle.y += particle.dy
            }

            stepIndex--
            if (!stepIndex) return true

        },
    }

}
