function Score (canvasHeight, bubbleDiameter, dpp) {

    var score = 0,
        x = 10 * dpp,
        y = canvasHeight - bubbleDiameter + 10 * dpp,
        font = 'bold ' + (26 * dpp) + 'px Arial, sans-serif'

    return {
        add: function (_score) {
            score += _score
        },
        get: function () {
            return score
        },
        paint: function (c) {
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
