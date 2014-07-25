function MainCanvas (width, height, dpp) {

    var transform = 'scale(' + (1 / dpp) + ')'
    var x = (width - width * dpp) / 2
    var y = (height - height * dpp) / 2
    transform += ' translate(' + x + 'px, ' + y + 'px)'

    var canvas = document.createElement('canvas')
    canvas.style.transform = transform
    canvas.className = 'MainCanvas'
    canvas.width = width
    canvas.height = height
    return canvas

}
