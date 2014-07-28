function Neighbors (bubble, columns) {

    function checkAndScan (colNumber, rowNumber, isBomb) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble || scannedBubbles[bubble.id]) return
        if (!isBomb && bubble.shape.colorName != shape.colorName) return

        scan(bubble)

    }

    function scan (bubble) {
        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        var isBomb = bubble.shape.isBomb
        scannedBubbles[bubble.id] = bubble
        neighbors.push(bubble)
        checkAndScan(colNumber - 2, rowNumber, isBomb)
        checkAndScan(colNumber + 2, rowNumber, isBomb)
        checkAndScan(colNumber - 1, rowNumber - 1, isBomb)
        checkAndScan(colNumber + 1, rowNumber - 1, isBomb)
        checkAndScan(colNumber - 1, rowNumber + 1, isBomb)
        checkAndScan(colNumber + 1, rowNumber + 1, isBomb)
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
