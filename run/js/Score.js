function Score (canvasWidth, canvasHeight, bubbleDiameter, dpp) {

    var score = 0
    var x = canvasWidth - 10 * dpp
    var y = canvasHeight - bubbleDiameter + 10 * dpp
    var font = 'bold ' + (26 * dpp) + 'px Arial, sans-serif'

    return {
        add: function (_score) {
            score += _score
        },
        paint: function (c) {
            c.textAlign = 'right'
            c.textBaseline = 'top'
            c.font = font
            c.fillStyle = '#777'
            c.fillText(score, x, y)
        },
        reset: function () {
            score = 0
        },
    }

}
