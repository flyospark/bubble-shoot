function BubbleShape_AnyColor (radius) {

    var halfSize = radius + 2
    var size = Math.floor(halfSize * 2)

    var canvas = document.createElement('canvas')
    canvas.width = canvas.height = size

    var c = canvas.getContext('2d')

    var p1x = 0
    var p1y = radius

    var p2x = radius / 2
    var p2y = -radius / 2

    var p3x = -radius / 2
    var p3y = -radius / 2

    var imageData = c.createImageData(size, size)
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {

            var cx = x - halfSize,
                cy = y - halfSize

            var h = Math.sqrt(Math.pow(cx - p1x, 2) + Math.pow(cy - p1y, 2))
            var r = h / radius
            r = Math.max(0, Math.min(1, 1 - r)) * 255

            var h = Math.sqrt(Math.pow(cx - p2x, 2) + Math.pow(cy - p2y, 2))
            var g = h / radius
            g = Math.max(0, Math.min(1, 1 - g)) * 255

            var h = Math.sqrt(Math.pow(cx - p3x, 2) + Math.pow(cy - p3y, 2))
            var b = h / radius
            b = Math.max(0, Math.min(1, 1 - b)) * 255

            var offset = (y * size + x) * 4
            imageData.data[offset] = r
            imageData.data[offset + 1] = g
            imageData.data[offset + 2] = b
            imageData.data[offset + 3] = 255

        }
    }

    c.putImageData(imageData, 0, 0)

    return {
        isAnyColor: true,
        colorName: 'anyColor',
        laserGradient: 'rgba(255, 255, 255, 0.2)',
        particleCanvases: {},
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfSize, y - halfSize)
        },
    }

}
