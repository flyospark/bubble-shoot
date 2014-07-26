function ResultCanvas (canvasWidth, canvasHeight, dpp) {

    function hideTick () {
        if (index) index--
        if (!index) {
            that.visible = false
            that.hiding = false
        }
        ratio = index / maxIndex
    }

    function showTick () {
        if (index < maxIndex) index++
        else that.showing = false
        ratio = index / maxIndex
    }

    var index = 0,
        maxIndex = 24,
        ratio = 0,
        fontHeight = (26 * dpp),
        font = 'bold ' + fontHeight + 'px Arial, sans-serif'

    var score, highScore

    var that = {
        tick: showTick,
        hiding: false,
        showing: false,
        visible: false,
        hide: function () {
            that.showing = false
            that.tick = hideTick
            that.hiding = true
        },
        paint: function (c) {

            var ratioSqr = Math.pow(ratio, 1 / 4)

            c.fillStyle = 'rgba(0, 0, 0, ' + (ratioSqr * 0.7) + ')'
            c.fillRect(0, 0, canvasWidth, canvasHeight)

            var x = canvasWidth / 2
            var y = canvasHeight / 4 + canvasHeight * ratioSqr / 4 - fontHeight * 1.5
            c.translate(x, y)
            c.fillStyle = 'rgba(255, 255, 255, ' + ratioSqr + ')'
            c.textAlign = 'center'
            c.textBaseline = 'top'
            c.font = font
            c.fillText('YOUR SCORE: ' + score, 0, 0)
            if (score > highScore) {
                c.fillText('NEW RECORD!', 0, fontHeight * 2)
            } else {
                c.fillText('HIGH SCORE: ' + highScore, 0, fontHeight * 2)
            }
            c.translate(-x, -y)

        },
        show: function (_score, _highScore) {
            score = _score
            highScore = _highScore
            that.visible = true
            that.hiding = false
            that.tick = showTick
            that.showing = true
        },
    }

    return that

}
