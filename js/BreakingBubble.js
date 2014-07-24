function BreakingBubble (x, y, shape) {

    var maxSteps = 16
    var stepIndex = maxSteps
    var fullCircle = Math.PI * 2
    var multiplier = 4

    var particles = []
    for (var i = 0; i < 4; i++) {
        particles.push({
            x: x,
            y: y,
            dx: (Math.random() * 2 - 1) * multiplier,
            dy: (Math.random() * 2 - 1) * multiplier,
        })
    }

    return {
        paint: function (c) {

            if (stepIndex == maxSteps) {
                shape.paint(c, x, y)
            }

            for (var i = 0; i < particles.length; i++) {
                var particle = particles[i],
                    px = particle.x,
                    py = particle.y
                c.beginPath()
                c.moveTo(px, py)
                c.globalAlpha = stepIndex / maxSteps
                c.fillStyle = shape.color
                c.arc(px, py, 4, 0, fullCircle)
                c.fill()
                c.globalAlpha = 1
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
