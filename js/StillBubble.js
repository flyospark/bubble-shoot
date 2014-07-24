function StillBubble (x, y, shape, rowNumber, colNumber) {

    var that = {
        colNumber: colNumber,
        id: Math.random(),
        rowNumber: rowNumber,
        x: x,
        y: y,
        shape: shape,
        addY: function (y) {
            that.y += y
        },
        paint: function (c) {
            shape.paint(c, x, that.y)
        },
    }

    return that

}
