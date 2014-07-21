function BlueBubbleShape (radius) {
    return {
        paint: function (c, x, y) {
            c.fillStyle = '#07f'
            c.beginPath()
            c.arc(x, y, radius, 0, Math.PI * 2)
            c.fill()
        },
    }
}
