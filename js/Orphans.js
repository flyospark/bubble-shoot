function Orphans (columns) {

    function get (colNumber, rowNumber) {
        var columnBubbles = columnsAndRows[colNumber]
        if (columnBubbles) return columnBubbles[rowNumber]
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

    var orphans = []
    for (var i = 0; i < columns.length; i++) {
        var columnBubbles = columns[i]
        for (var j = 0; j < columnBubbles.length; j++) {

            var bubble = columnBubbles[j]
            var colNumber = bubble.colNumber
            var rowNumber = bubble.rowNumber

            if (!rowNumber) continue

            var topLeftBubble = get(colNumber - 1, rowNumber - 1)
            var topRightBubble = get(colNumber + 1, rowNumber - 1)
            if (!topLeftBubble && !topRightBubble) {
                orphans.push(bubble)
            }

        }
    }
    return orphans

}
