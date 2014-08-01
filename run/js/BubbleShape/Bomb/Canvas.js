function BubbleShape_Bomb_Canvas (canvas, radius) {

    var c = canvas.getContext('2d')

    var color = 'rgba(255 ,255, 255, 0.45)'

    c.beginPath()
    c.arc(0, 0, radius * 0.2, 0, Math.PI * 2)
    c.fillStyle = color
    c.fill()

    var numSteps = 3
    var stepAngle = Math.PI * 2 / numSteps
    var shapeRadius = radius * 0.6
    var arcAngle = Math.PI / 3
    c.lineWidth = radius * 0.6
    c.beginPath()
    c.rotate(-Math.PI / 2 - arcAngle / 2)
    for (var i = 0; i < numSteps; i++) {
        c.moveTo(shapeRadius, 0)
        c.arc(0, 0, shapeRadius, 0, arcAngle)
        c.rotate(stepAngle)
    }
    c.strokeStyle = color
    c.stroke()

}
