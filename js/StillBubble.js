function StillBubble (x, y, shape, rowNumber, colNumber) {

    var that = {
        colNumber: colNumber,
        id: Math.random(),
        rowNumber: rowNumber,
        y: y,
        shape: shape,
        addY: function (y) {
            that.y += y
        },
        distanceTo: function (pointX, pointY) {
            return Math.hypot(x - pointX, that.y - pointY)
        },
        paint: function (c) {
            shape.paint(c, x, that.y)
        },
    }

    return that

}
