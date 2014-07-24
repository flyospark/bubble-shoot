function Orphans (columns) {

    function checkAndExclude (colNumber, rowNumber) {

        var bubble = get(colNumber, rowNumber)
        if (!bubble) return

        var id = bubble.id
        if (scannedBubbles[id]) return

        scannedBubbles[id] = true
        orphans.splice(orphans.indexOf(bubble), 1)
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

    function get (colNumber, rowNumber) {
        var columnBubbles = columnsAndRows[colNumber]
        if (columnBubbles) return columnBubbles[rowNumber]
    }

    var topBubbles = []
    var orphans = []
    var columnsAndRows = {}
    for (var i = 0; i < columns.length; i++) {
        var bubbles = columns[i]
        columnsAndRows[i] = {}
        for (var j = 0; j < bubbles.length; j++) {
            var bubble = bubbles[j]
            var rowNumber = bubble.rowNumber
            if (rowNumber) {
                columnsAndRows[i][rowNumber] = bubble
                orphans.push(bubble)
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
