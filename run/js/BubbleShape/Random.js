function BubbleShape_Random (bubbleRadius) {

    var shapes = [
        BubbleShape_Red(bubbleRadius),
        BubbleShape_Green(bubbleRadius),
        BubbleShape_Blue(bubbleRadius),
        BubbleShape_Violet(bubbleRadius),
        BubbleShape_Yellow(bubbleRadius),
        BubbleShape_White(bubbleRadius),
    ]

    return {
        next: function () {
            return shapes[Math.floor(Math.random() * shapes.length)]
        },
    }

}
