function RandomShape () {
    var shapes = []
    return {
        add: function (shape) {
            shapes.push(shape)
        },
        get: function () {
            return shapes[Math.floor(Math.random() * shapes.length)]
        },
    }
}
