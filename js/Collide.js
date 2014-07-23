function Collide (movingBubbles, stillBubbles, bubbleRadius, verticalDistance,
    canvasWidth, canvasHeight, stillCanvas, bubbleDiameter) {

    var collisions = []
    for (var i = 0; i < movingBubbles.length; i++) {
        var movingBubble = movingBubbles[i]
        var collision = movingBubble.collides(stillBubbles)
        if (collision) {
            collision.movingBubble = movingBubble
            collisions.push(collision)
        }
    }
    return collisions

}
