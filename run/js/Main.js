(function () {

    function start () {
        mainPanel = MainPanel()
        body.appendChild(mainPanel.element)
    }

    var mainPanel
    var body = document.body
    start()

    addEventListener('resize', function () {
        mainPanel.destroy()
        document.body.removeChild(mainPanel.element)
        start()
    })

})()
