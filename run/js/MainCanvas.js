function MainCanvas (width, height, dpp) {

    var x = (width - width * dpp) / 2
    var y = (height - height * dpp) / 2

    var canvas = document.createElement('canvas')
    canvas.style.transform =
        'scale(' + (1 / dpp) + ')' +
        ' translate(' + x + 'px, ' + y + 'px)'
    canvas.className = 'MainCanvas'
    canvas.width = width
    canvas.height = height
    return canvas

}
