function BreakingBubble (x, y) {

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
            for (var i = 0; i < particles.length; i++) {
                var particle = particles[i],
                    x = particle.x,
                    y = particle.y
                c.beginPath()
                c.moveTo(x, y)
                c.fillStyle = 'rgba(255, 255, 255, ' + (stepIndex / maxSteps) + ')'
                c.arc(x, y, 4, 0, fullCircle)
                c.fill()
            }
        },
        tick: function () {
            stepIndex--
            for (var i = 0; i < particles.length; i++) {
                var particle = particles[i]
                particle.x += particle.dx
                particle.y += particle.dy
            }
            if (!stepIndex) return true
        },
    }

}
