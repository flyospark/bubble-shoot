function RedBubbleShape (radius) {
    return {
        paint: function (c, x, y) {
            c.fillStyle = '#f22'
            c.beginPath()
            c.arc(x, y, radius, 0, Math.PI * 2)
            c.fill()
        },
    }
}
