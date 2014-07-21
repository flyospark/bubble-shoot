function StillBubble (canvasWidth, x, y, shape) {
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
        getY: function () {
            return y
        },
        paint: function (c) {
            shape.paint(c, x, y)
        },
        setY: function (_y) {
            y = _y
        },
    }
}
