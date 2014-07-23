function Orphans (columns) {

    function checkAndPush (colNumber, rowNumber) {

        var columnBubbles = columnsAndRows[colNumber]
        if (!columnBubbles) return

        var bubble = columnBubbles[rowNumber]
        if (!bubble || scannedBubbles[bubble.id]) return

        push(bubble)

    }

    function get (colNumber, rowNumber) {
        var columnBubbles = columnsAndRows[colNumber]
        if (columnBubbles) return columnBubbles[rowNumber]
    }

    function push (bubble) {
        scannedBubbles[bubble.id] = true
        orphans.push(bubble)
        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        checkAndPush(colNumber + 1, rowNumber + 1)
        checkAndPush(colNumber - 1, rowNumber + 1)
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

    var scannedBubbles = {}
    var orphans = []
    for (var i = 0; i < columns.length; i++) {
        var columnBubbles = columns[i]
        for (var j = 0; j < columnBubbles.length; j++) {

            var bubble = columnBubbles[j]
            if (scannedBubbles[bubble.id]) continue

            var colNumber = bubble.colNumber
            var rowNumber = bubble.rowNumber

            if (!rowNumber) continue

            if (get(colNumber - 1, rowNumber - 1)) continue
            if (get(colNumber + 1, rowNumber - 1)) continue
            if (get(colNumber - 2, rowNumber)) continue
            if (get(colNumber + 2, rowNumber)) continue
            if (get(colNumber - 1, rowNumber + 1)) continue
            if (get(colNumber + 1, rowNumber + 1)) continue

            push(bubble)

        }
    }
    return orphans

}
