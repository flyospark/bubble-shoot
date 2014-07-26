function ResultCanvas (canvasWidth, canvasHeight) {

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

    var index = 0
    var maxIndex = 24
    var ratio = 0

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
            c.fillStyle = 'rgba(0, 0, 0, ' + (ratio * 0.7) + ')'
            c.fillRect(0, 0, canvasWidth, canvasHeight)
        },
        show: function () {
            that.visible = true
            that.hiding = false
            that.tick = showTick
            that.showing = true
        },
    }

    return that

}
