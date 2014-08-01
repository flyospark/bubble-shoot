function Shuffle (items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i]
        var randomIndex = i + Math.floor(Math.random() * (items.length - i))
        items[i] = items[randomIndex]
        items[randomIndex] = item
    }
    return items
}
