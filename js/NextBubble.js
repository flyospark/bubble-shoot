function NextBubble (canvasWidth, canvasHeight, radius, shape) {

    var x = canvasWidth / 2
    var y = canvasHeight - radius

    return {
        shape: shape,
        paint: function (c) {
            shape.paint(c, x, y)
        },
    }

}
