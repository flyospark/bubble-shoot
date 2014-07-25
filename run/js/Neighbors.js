function Neighbors (bubble, columns) {

    function checkAndScan (colNumber, rowNumber) {

        var columnBubbles = columnsAndRows[colNumber]
        if (!columnBubbles) return

        var bubble = columnBubbles[rowNumber]
        if (!bubble || scannedBubbles[bubble.id] || bubble.shape != shape) return

        scan(bubble)

    }

    function scan (bubble) {
        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        scannedBubbles[bubble.id] = bubble
        neighbors.push(bubble)
        checkAndScan(colNumber - 2, rowNumber)
        checkAndScan(colNumber + 2, rowNumber)
        checkAndScan(colNumber - 1, rowNumber - 1)
        checkAndScan(colNumber + 1, rowNumber - 1)
        checkAndScan(colNumber - 1, rowNumber + 1)
        checkAndScan(colNumber + 1, rowNumber + 1)
    }

    var columnsAndRows = {}
    for (var i = 0; i < columns.length; i++) {
        var columnBubbles = columns[i]
        columnsAndRows[i] = {}
        for (var j = 0; j < columnBubbles.length; j++) {
            var columnBubble = columnBubbles[j]
            columnsAndRows[i][columnBubble.rowNumber] = columnBubble
        }
    }

    var shape = bubble.shape
    var scannedBubbles = {}
    var neighbors = []
    scan(bubble)

    return neighbors

}
