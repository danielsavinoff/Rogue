function runFrame() {
    cleanScene()
    populate(entities)
    render(game)
    window.requestAnimationFrame(runFrame)
}

runFrame()