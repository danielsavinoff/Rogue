var emptyIndices = findElementIndices(game, path);

var enemyInstances = [];

for(var i = 0; i < enemy_max; i++) {
    var randomIndex = Math.floor(
        Math.random() * emptyIndices.length
    );
    
    var instance = emptyIndices[randomIndex];
    instance.health = 100;

    enemyInstances.push(instance);
    emptyIndices.splice(randomIndex, 1);
}

var moveEnemy = setInterval(function updateEnemyCoordinates() {
    if (!enemyInstances.length) clearInterval(moveEnemy);

    enemyInstances.forEach(function setEnemyCoordinates(element) {

        if(
            (element.y - 1 < h && element.y - 1 > 0 && 
            game[element.y - 1][element.x].className.includes(player.className)) ||
            (element.y + 1 < h && element.y + 1 > 0 && 
            game[element.y + 1][element.x].className.includes(player.className)) ||
            (element.x - 1 < w && element.x - 1 > 0 && 
            game[element.y][element.x - 1].className.includes(player.className)) ||
            (element.x + 1 < w && element.x + 1 > 0 && 
            game[element.y][element.x + 1].className.includes(player.className))
        ) {
            playerInstance.health -= enemy_power;

            damage.classList.remove("hidden");
            setTimeout(function hideDamage() {
                damage.classList.add("hidden");
            }, 500);

            if (playerInstance.health <= 0) {
                gameOver.classList.remove("hidden");
            }

        } else {
            var index = Math.random() > .5 ? "x" : "y";
            var step = Math.random() > .5 ? 1 : -1;
            var newCoordinate = element[index] + step;
            
            if (index === "x") {
                if (newCoordinate < 0 || newCoordinate > w - 1) return;

                if (game[element.y][newCoordinate].className === path.className) {
                    populate(game[element.y][element.x], [{x: newCoordinate, y: element.y, health: element.health}]);
                    populate(path, [{x: element.x, y: element.y}]);
                    element.x = newCoordinate;
                    element.left = step < 0
                }
            } else {
                if (newCoordinate < 0 || newCoordinate > h - 1) return;

                if (game[newCoordinate][element.x].className === path.className) {
                    populate(game[element.y][element.x], [{x: element.x, y: newCoordinate, health: element.health}])
                    populate(path, [{x: element.x, y: element.y}]);
                    element.y = newCoordinate;
                }
            }
        }

    });
}, 750);