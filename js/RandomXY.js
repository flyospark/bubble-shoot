function RandomXY (minDistance, scale) {
    var angle = Math.random() * Math.PI * 2
    var distance = minDistance + Math.random() * scale
    var x = Math.cos(angle) * distance
    var y = Math.sin(angle) * distance
    return [x, y]
}
