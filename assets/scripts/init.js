function runFrame() {
    cleanScene();
    populate(sword, swordInstances);
    populate(hp, hpInstances);
    populate(enemy, enemyInstances);
    populate(player, [playerInstance]);
    render(game);
    window.requestAnimationFrame(runFrame);
}

runFrame();

