function Score (canvasWidth, canvasHeight, bubbleDiameter) {

    var score = 0
    var x = canvasWidth - 11
    var y = canvasHeight - bubbleDiameter + 12
    var font = 'bold 26px Arial, sans-serif'

    return {
        add: function (_score) {
            score += _score
        },
        paint: function (c) {
            c.textAlign = 'right'
            c.textBaseline = 'top'
            c.font = font
            c.fillStyle = '#555'
            c.fillText(score, x, y)
        },
        reset: function () {
            score = 0
        },
    }

}
