function BreakingBubble (x, y, shape, scale) {

    var particelScale
    var numParticles
    if (shape.isBomb) {
        particelScale = 3 * scale
        numParticles = 10
    } else {
        particelScale = 2 * scale
        numParticles = 5
    }

    var index = 0
    var particleCanvases = shape.getParticleCanvases(numParticles)

    var particles = []
    for (var i = 0; i < numParticles; i++) {
        var locationXY = RandomXY(particelScale, particelScale)
        var directionXY = RandomXY(particelScale, particelScale)
        particles.push({
            canvases: particleCanvases[i],
            x: x + locationXY[0],
            y: y + locationXY[1],
            dx: directionXY[0],
            dy: directionXY[1],
        })
    }

    return {
        id: Math.random(),
        paint: function (c) {

            if (!index) shape.paint(c, x, y)

            for (var i in particles) {
                var particle = particles[i],
                    canvas = particle.canvases[index],
                    px = particle.x - canvas.width / 2,
                    py = particle.y - canvas.height / 2
                c.drawImage(canvas, px, py)
            }

        },
        tick: function () {

            for (var i in particles) {
                var particle = particles[i]
                particle.x += particle.dx
                particle.y += particle.dy
            }

            index++
            if (index == particleCanvases[0].length) return true

        },
    }

}
