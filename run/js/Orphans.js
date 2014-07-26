function Orphans (columns) {

    function checkAndExclude (colNumber, rowNumber) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble) return

        var id = bubble.id
        if (scannedBubbles[id]) return

        scannedBubbles[id] = true
        delete orphans[id]
        checkChildren(bubble)

    }

    function checkChildren (bubble) {
        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        checkAndExclude(colNumber - 1, rowNumber - 1)
        checkAndExclude(colNumber + 1, rowNumber - 1)
        checkAndExclude(colNumber - 2, rowNumber)
        checkAndExclude(colNumber + 2, rowNumber)
        checkAndExclude(colNumber - 1, rowNumber + 1)
        checkAndExclude(colNumber + 1, rowNumber + 1)
    }

    var topBubbles = [],
        orphans = {},
        columnsAndRows = {}
    for (var i in columns) {
        var bubbles = columns[i]
        columnsAndRows[i] = {}
        for (var j in bubbles) {
            var bubble = bubbles[j]
            var rowNumber = bubble.rowNumber
            if (rowNumber) {
                columnsAndRows[i][rowNumber] = bubble
                orphans[bubble.id] = bubble
            } else {
                topBubbles.push(bubble)
            }
        }
    }

    var scannedBubbles = {}
    for (var i = 0; i < topBubbles.length; i++) {
        checkChildren(topBubbles[i])
    }

    return orphans

}
