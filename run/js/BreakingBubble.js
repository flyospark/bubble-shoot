function BreakingBubble (x, y, shape, scale) {

    var index = 0
    var particleCanvases = shape.particleCanvases

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

    return {
        id: Math.random(),
        paint: function (c) {

            if (!index) shape.paint(c, x, y)

            for (var i in particles) {
                var canvas = particleCanvases[index],
                    particle = particles[i],
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
            if (index == particleCanvases.length) return true

        },
    }

}
