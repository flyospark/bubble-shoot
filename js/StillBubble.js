function StillBubble (canvasWidth, x, y, shape, rowNumber, colNumber) {
    return {
        colNumber: colNumber,
        id: Math.random(),
        rowNumber: rowNumber,
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
