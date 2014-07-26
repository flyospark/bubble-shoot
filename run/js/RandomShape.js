function RandomShape () {

    var outcomes = []
    var maxChance = 0

    return {
        add: function (chance, shape) {
            outcomes.push({
                chance: chance,
                shape: shape,
            })
            maxChance += chance
        },
        get: function () {
            var random = Math.random() * maxChance
            for (var i in outcomes) {
                var outcome = outcomes[i]
                random -= outcome.chance
                if (random < 0) return outcome.shape
            }
        },
    }

}
