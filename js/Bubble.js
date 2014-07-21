function Bubble (canvasWidth, x, y, shape) {
    return {
        distanceTo: function (pointX, pointY) {
            return Math.hypot(x - pointX, y - pointY)
        },
        paint: function (c) {
            shape.paint(c, x, y)
        },
    }
}
