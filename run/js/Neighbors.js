function Neighbors (bubble, columns) {

    function checkAndScan (colNumber, rowNumber, matchShape) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble || scannedBubbles[bubble.id]) return
        if (!matchShape.isAnyColor && bubble.shape.colorName != matchShape.colorName) return

        scan(bubble)

    }

    function scan (bubble) {

        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        scannedBubbles[bubble.id] = bubble
        neighbors.push(bubble)

        var shape = bubble.shape
        checkAndScan(colNumber - 2, rowNumber, shape)
        checkAndScan(colNumber + 2, rowNumber, shape)
        checkAndScan(colNumber - 1, rowNumber - 1, shape)
        checkAndScan(colNumber + 1, rowNumber - 1, shape)
        checkAndScan(colNumber - 1, rowNumber + 1, shape)
        checkAndScan(colNumber + 1, rowNumber + 1, shape)

    }

    var columnsAndRows = {}
    for (var i in columns) {
        var bubbles = columns[i]
        columnsAndRows[i] = {}
        for (var j in bubbles) {
            var itemBubble = bubbles[j]
            columnsAndRows[i][itemBubble.rowNumber] = itemBubble
        }
    }

    var scannedBubbles = {}
    var neighbors = []
    scan(bubble)

    return neighbors

}
