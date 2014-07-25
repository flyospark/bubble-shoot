function StillBubble (x, y, shape, rowNumber, colNumber) {

    var that = {
        colNumber: colNumber,
        id: Math.random(),
        rowNumber: rowNumber,
        shape: shape,
        x: x,
        y: y,
        paint: function (c) {
            shape.paint(c, x, that.y)
        },
    }

    return that

}
