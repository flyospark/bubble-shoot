function BubbleShape_AnyColor (radius, particleCanvases) {

    function backgroundCanvas () {

        var canvas = document.createElement('canvas')
        canvas.width = canvas.height = size

        var c = canvas.getContext('2d')

        var imageData = c.createImageData(size, size)
        for (var y = 0; y < size; y++) {
            for (var x = 0; x < size; x++) {

                var centerX = x - halfSize,
                    centerY = y - halfSize,
                    distance = Math.sqrt(centerX * centerX + centerY * centerY) / radius

                var angle = Math.atan(centerY / centerX)
                if (centerX < 0) angle += Math.PI
                angle -= 0.3

                var r = 0, g = 0, b = 0

                r = Math.abs(angle - Math.PI / 2) - 1
                g = -Math.abs(angle - Math.PI / 3) + 2
                b = -Math.abs(angle - Math.PI * 2 / 3) + 2

                r = Math.max(0, Math.min(1, 1 - r * distance)) * 255
                g = Math.max(0, Math.min(1, 1 - g * distance)) * 255
                b = Math.max(0, Math.min(1, 1 - b * distance)) * 255

                r = 16 + r * (255 - 32) / 256
                g = 16 + g * (255 - 32) / 256
                b = 16 + b * (255 - 32) / 256

                var offset = (y * size + x) * 4
                imageData.data[offset] = r
                imageData.data[offset + 1] = g
                imageData.data[offset + 2] = b
                imageData.data[offset + 3] = 255

            }
        }

        c.putImageData(imageData, 0, 0)

        return canvas

    }

    var halfSize = radius + 2
    var size = Math.floor(halfSize * 2)

    var canvas = document.createElement('canvas')
    canvas.width = canvas.height = size

    var c = canvas.getContext('2d')

    c.arc(halfSize, halfSize, radius, 0, Math.PI * 2)
    c.clip()
    c.drawImage(backgroundCanvas(), 0, 0)

    return {
        isAnyColor: true,
        colorName: 'anyColor',
        laserGradient: 'rgba(255, 255, 255, 0.2)',
        particleCanvases: particleCanvases,
        getParticleCanvases: function (number) {
            var canvases = []
            for (var i = 0; i < number; i++) {
                var index = Math.floor(Math.random() * particleCanvases.length)
                canvases.push(particleCanvases[index])
            }
            return canvases
        },
        paint: function (c, x, y) {
            c.drawImage(canvas, x - halfSize, y - halfSize)
        },
    }

}
