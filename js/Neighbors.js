function Neighbors (bubble, columns) {

    function scan (bubble) {

        var shape = bubble.shape
        var colNumber = bubble.colNumber
        var rowNumber = bubble.rowNumber

        for (var i = 0; i < columns.length; i++) {
            var otherBubbles = columns[i]
            for (var j = 0; j < otherBubbles.length; j++) {

                var otherBubble = otherBubbles[j]
                if (scannedBubbles[otherBubble.id]) continue

                if (otherBubble.rowNumber == rowNumber && otherBubble.shape == shape) {
                    scannedBubbles[otherBubble.id] = true
                    neighbors.push(otherBubble)
                }

            }
        }

    }

    var scannedBubbles = {}
    scannedBubbles[bubble.id] = true

    var neighbors = [bubble]
    scan(bubble)

    return neighbors

}
