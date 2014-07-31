function ParticleCanvases (scale, color) {
    var steps = 16
    var canvases = []
    for (var i = 0; i < steps; i++) {
        canvases.push(ParticleCanvas(scale, color, steps, i))
    }
    return canvases
}
