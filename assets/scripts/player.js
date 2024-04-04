var emptyIndices = findElementIndices(game, path);

var playerInstance = emptyIndices[
    Math.floor(Math.random() * (emptyIndices.length - 1))
];
playerInstance.health = 100;
playerInstance.powerMultiplicator = 1.0;

document.addEventListener("keyup", function listener(event) {
    var code = event.code;

    switch(code) {
        case "KeyW":
            goTo(playerInstance.x, playerInstance.y - 1);
            break;
        case "KeyA":
            goTo(playerInstance.x - 1, playerInstance.y);
            playerInstance.left = true;
            break;
        case "KeyD": 
            goTo(playerInstance.x + 1, playerInstance.y);
            playerInstance.left = false;
            break;
        case "KeyS": 
            goTo(playerInstance.x, playerInstance.y + 1);
            break;
        case "Space":
            attack(playerInstance.x, playerInstance.y - 1);
            attack(playerInstance.x, playerInstance.y + 1);
            attack(playerInstance.x - 1, playerInstance.y);
            attack(playerInstance.x + 1, playerInstance.y);
            break;
    }
});

function goTo(x, y) {
    if (
        path.isEqualNode(game[y][x]) ||
        hp.isEqualNode(game[y][x]) ||
        sword.isEqualNode(game[y][x])
    ) {
        if (hp.isEqualNode(game[y][x])) {
            hpInstances.splice(hpInstances.findIndex(
                function getHpIndex(hp) {
                    return hp.x === x && hp.y === y
                }
            ))

            playerInstance.health = 100;
        }

        if (sword.isEqualNode(game[y][x])) {
            swordInstances.splice(swordInstances.findIndex(
                function getSwordIndex(sword) {
                    return sword.x === x && sword.y === y
                }
            ))

            playerInstance.powerMultiplicator = 2.0;

            setTimeout(function cleanMultiplicator() {
                playerInstance.powerMultiplicator = 1.0;
            }, 10000);
        }

        populate(player, [{
            x: x,
            y: y,
            health: playerInstance.health
        }]);
        populate(path, [{
            x: playerInstance.x, 
            y: playerInstance.y,
        }]);

        playerInstance.x = x;
        playerInstance.y = y;
    } 
}

function attack(x, y) {
    if (
        enemy.className === game[y][x].className ||
        enemy.className + " left" === game[y][x].className
    ) {
        var instanceIndex = enemyInstances.findIndex(
            function getEnemyIndex(enemy) {
                return enemy.x === x && enemy.y === y
            }
        );
        var instance = enemyInstances[instanceIndex];

        var damage = player_power * playerInstance.powerMultiplicator;

        if (enemyInstances[instanceIndex].health - damage <= 0) {
            enemyInstances.splice(instanceIndex, 1);
            populate(path, [{x,y}]);
        }

        instance.health -= damage;
    }
}