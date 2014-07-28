function Neighbors (bubble, columns) {

    function checkAndScan (colNumber, rowNumber) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble || scannedBubbles[bubble.id]) return
        if (bubble.shape.colorName != shape.colorName) return

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
    for (var i in columns) {
        var bubbles = columns[i]
        columnsAndRows[i] = {}
        for (var j in bubbles) {
            var itemBubble = bubbles[j]
            columnsAndRows[i][itemBubble.rowNumber] = itemBubble
        }
    }

    var shape = bubble.shape
    var scannedBubbles = {}
    var neighbors = []
    scan(bubble)

    return neighbors

}
