function InjectionNeighbors (bubble, columns) {

    function checkAndScan (colNumber, rowNumber) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble || scannedBubbles[bubble.id]) return

        queue.push(bubble)

    }

    function scanNext () {

        var bubble = queue.shift()
        if (!bubble) return

        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        scannedBubbles[bubble.id] = bubble
        var shape = bubble.shape
        if (shape != excludeShape) {
            neighbors.push(bubble)
            if (neighbors.length > 5) return
        }

        Shuffle(checkFunctions)
        for (var i in checkFunctions) checkFunctions[i](colNumber, rowNumber)

        scanNext()

    }

    var checkFunctions = [
        function (colNumber, rowNumber) {
            checkAndScan(colNumber - 2, rowNumber)
        },
        function (colNumber, rowNumber) {
            checkAndScan(colNumber + 2, rowNumber)
        },
        function (colNumber, rowNumber) {
            checkAndScan(colNumber - 1, rowNumber - 1)
        },
        function (colNumber, rowNumber) {
            checkAndScan(colNumber + 1, rowNumber - 1)
        },
        function (colNumber, rowNumber) {
            checkAndScan(colNumber - 1, rowNumber + 1)
        },
        function (colNumber, rowNumber) {
            checkAndScan(colNumber + 1, rowNumber + 1)
        },
    ]

    var excludeShape = bubble.shape

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
    var queue = [bubble]
    scanNext()

    return neighbors

}
    
