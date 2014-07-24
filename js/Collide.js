function Collide (movingBubbles, stillBubbles, bubbleVisualDiameter) {

    var collisions = []
    for (var i = 0; i < movingBubbles.length; i++) {
        var movingBubble = movingBubbles[i]
        for (var j = 0; j < stillBubbles.length; j++) {
            var stillBubble = stillBubbles[j]
            var distance = Math.hypot(stillBubble.x - movingBubble.x, stillBubble.y - movingBubble.y)
            if (distance < bubbleVisualDiameter) {
                collisions.push({
                    movingBubble: movingBubble,
                    stillBubble: stillBubble,
                    distance: distance,
                })
            }
        }
    }
    return collisions

}
