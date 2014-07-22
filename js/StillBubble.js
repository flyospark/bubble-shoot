function StillBubble (canvasWidth, x, y, shape) {
    return {
        bottomLeft: null,
        bottomRight: null,
        id: Math.random(),
        left: null,
        right: null,
        topLeft: null,
        topRight: null,
        addY: function (_y) {
            y += _y
        },
        distanceTo: function (pointX, pointY) {
            return Math.hypot(x - pointX, y - pointY)
        },
        getY: function () {
            return y
        },
        paint: function (c) {
            shape.paint(c, x, y)
        },
    }
}
