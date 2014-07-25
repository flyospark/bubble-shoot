function RandomXY (minDistance, scale) {
    var angle = Math.random() * Math.PI * 2,
        distance = minDistance + Math.random() * scale,
        x = Math.cos(angle) * distance,
        y = Math.sin(angle) * distance
    return [x, y]
}
