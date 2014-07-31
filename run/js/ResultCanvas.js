function ResultCanvas (canvasWidth, canvasHeight, dpp) {

    function hideTick () {
        if (index) index--
        if (!index) {
            that.visible = false
            that.hiding = false
        }
        ratio = index / maxIndex
        ratioSqr = Math.pow(ratio, 1 / 4)
    }

    function showTick () {
        if (index < maxIndex) index++
        else that.showing = false
        ratio = index / maxIndex
        ratioSqr = Math.pow(ratio, 1 / 4)
    }

    var index = 0,
        maxIndex = 24,
        ratio = 0,
        ratioSqr = 0,
        largeFontHeight = (48 * dpp),
        largeFont = 'bold ' + largeFontHeight + 'px Arial, sans-serif',
        middleFontHeight = (36 * dpp),
        middleFont = 'bold ' + middleFontHeight + 'px Arial, sans-serif',
        smallFontHeight = (22 * dpp),
        smallFont = smallFontHeight + 'px Arial, sans-serif'

    var score, highScore, record

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

            c.fillStyle = 'rgba(0, 0, 0, ' + (ratioSqr * 0.7) + ')'
            c.fillRect(0, 0, canvasWidth, canvasHeight)

            c.fillStyle = 'rgba(255, 255, 255, ' + ratioSqr + ')'
            c.textAlign = 'center'
            c.textBaseline = 'top'

            var x = canvasWidth / 2
            var y = canvasHeight / 4 + canvasHeight * ratioSqr / 4 - largeFontHeight * 1.5
            c.save()
            c.translate(x, y)

            c.font = smallFont
            c.fillText('YOUR SCORE', 0, 0)
            c.translate(0, smallFontHeight)

            c.font = largeFont
            c.fillText(score, 0, 0)
            c.translate(0, largeFontHeight + smallFontHeight)

            if (record) {
                c.font = middleFont
                c.fillStyle = 'hsl(60, 90%, 70%)'
                c.fillText('NEW RECORD!', 0, 0)
            } else {

                c.font = smallFont
                c.fillText('HIGH SCORE', 0, 0)
                c.translate(0, smallFontHeight)

                c.font = largeFont
                c.fillText(highScore, 0, 0)

            }

            c.restore()

        },
        show: function (_score, _highScore) {
            score = _score
            highScore = _highScore
            record = score > highScore
            that.visible = true
            that.hiding = false
            that.tick = showTick
            that.showing = true
        },
    }

    return that

}
