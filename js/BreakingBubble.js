function BreakingBubble (x, y, shape) {

    var maxSteps = 16
    var stepIndex = maxSteps
    var fullCircle = Math.PI * 2

    var particles = []
    for (var i = 0; i < 6; i++) {
        var randomXY = RandomXY(2, 2)
        particles.push({
            x: x,
            y: y,
            dx: randomXY[0],
            dy: randomXY[1],
        })
    }

    return {
        paint: function (c) {

            if (stepIndex == maxSteps) shape.paint(c, x, y)

            for (var i = 0; i < particles.length; i++) {
                var particle = particles[i],
                    px = particle.x,
                    py = particle.y
                c.beginPath()
                c.moveTo(px, py)
                c.fillStyle = shape.color
                c.arc(px, py, 4 * stepIndex / maxSteps, 0, fullCircle)
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
