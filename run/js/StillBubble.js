function StillBubble (x, y, shape, rowNumber, colNumber) {

    var that = {
        colNumber: colNumber,
        id: Math.random(),
        rowNumber: rowNumber,
        x: x,
        y: y,
        shape: shape,
        paint: function (c) {
            shape.paint(c, x, that.y)
        },
    }

    return that

}
