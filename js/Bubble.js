function Bubble (canvasWidth, x, y, shape) {
    return {
        bottomLeft: null,
        bottomRight: null,
        left: null,
        right: null,
        topLeft: null,
        topRight: null,
        distanceTo: function (pointX, pointY) {
            return Math.hypot(x - pointX, y - pointY)
        },
        paint: function (c) {
            shape.paint(c, x, y)
        },
    }
}
