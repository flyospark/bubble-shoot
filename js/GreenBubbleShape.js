function GreenBubbleShape (radius) {
    return {
        paint: function (c, x, y) {
            c.fillStyle = '#0c0'
            c.beginPath()
            c.arc(x, y, radius, 0, Math.PI * 2)
            c.fill()
        },
    }
}
