function Collide (movingBubbles, stillBubbles, bubbleRadius, verticalDistance,
    canvasWidth, canvasHeight, stillCanvas, bubbleDiameter) {

    var collisions = []
    for (var i = 0; i < movingBubbles.length; i++) {
        var movingBubble = movingBubbles[i]
        if (movingBubble.collides(stillBubbles)) {
            collisions.push(movingBubble)
        }
    }
    return collisions

}
