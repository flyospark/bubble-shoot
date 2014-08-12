function BombNeighbors (columnsAndRows, neighbors) {

    function checkAndInclude (colNumber, rowNumber) {

        var bubbles = columnsAndRows[colNumber]
        if (!bubbles) return

        var bubble = bubbles[rowNumber]
        if (!bubble || bombNeighbors[bubble.id]) return

        bombNeighbors[bubble.id] = bubble
        if (bubble.shape.isBomb)include(bubble)

    }

    function include (bubble) {
        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber
        checkAndInclude(colNumber - 2, rowNumber)
        checkAndInclude(colNumber + 2, rowNumber)
        checkAndInclude(colNumber - 1, rowNumber - 1)
        checkAndInclude(colNumber + 1, rowNumber - 1)
        checkAndInclude(colNumber - 1, rowNumber + 1)
        checkAndInclude(colNumber + 1, rowNumber + 1)
    }

    var bombNeighbors = {}
    for (var i = 0; i < neighbors.length; i++) {
        var bubble = neighbors[i]
        bombNeighbors[bubble.id] = bubble
        if (bubble.shape.isBomb) include(bubble)
    }
    return bombNeighbors

}
