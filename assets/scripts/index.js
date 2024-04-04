/* Variables that affect the flow of the game */
var w = 32;
var h = 20;
var exit_min = 3;
var exit_max = 5;
var room_min_dimension = 3;
var room_max_dimension = 8;
var room_min = 3;
var room_max = 8;
var swords_max = 2;
var hp_max = 10;
var enemy_max = 10;
var player_power = 30;
var enemy_power = 20;
/* Variables that affect the flow of the game */


var wall = document.createElement("div");
wall.className = "tile tileW";
var path = document.createElement("div");
path.className = "tile";
var player = document.createElement("div");
player.className = "tile tileP";
var hp = document.createElement("div");
hp.className = "tile tileHP";
var sword = document.createElement("div");
sword.className = "tile tileSW";
var enemy = document.createElement("div");
enemy.className = "tile tileE";
var playerHealth = document.createElement("div");
playerHealth.className = "healthP";
var enemyHealth = document.createElement("div");
enemyHealth.className = "healthE";


player.appendChild(playerHealth);
enemy.appendChild(enemyHealth);


/** 
 * Two-dimensional (h × w) array
 */
var game = [];


var exitColIndexes = getExitIndices(w, exit_min, exit_max);
var exitRowIndexes = getExitIndices(h, exit_min, exit_max);
var roomCoordinates = getRoomIndices(
    w, 
    h, 
    room_min_dimension, 
    room_max_dimension, 
    getRandomNumBetween(room_min, room_max)
);


for (var y = 0; y < h; y++) {
    game.push([]);

    for (var x = 0; x < w; x++) {
        var isPath = ( 
            exitColIndexes.includes(x) || 
            exitRowIndexes.includes(y) ||
            roomCoordinates.some(
                function findIntersection(
                    element
                ) {
                    return(
                        element.x === x &&
                        element.y === y    
                    )
                }
            ) 
        );

        game[y].push( 
            isPath ? path.cloneNode(true) : wall.cloneNode(true)
        );
    }
}


/**
 * @param {Node} node - node that is being cloned
 * @param {Array<{x: number, y: number, health: undefined | number, left: boolean | undefined}>} instances - an array with options of instances
 * @returns {void}
 */
function populate(node, instances) {
    instances.forEach(function addToGame(instance) {
        var clonedNode = node.cloneNode(true);

        if (instance.health) 
            clonedNode.childNodes[0].style.maxWidth = instance.health + "%";
   
        if (instance.left)
            clonedNode.classList.add("left")
        else 
            clonedNode.classList.remove("left")

        game[instance.y][instance.x] = clonedNode;
    })
}


var field = document.querySelector(".field");
/**
 * Recursive function that populates the scene.
 * @param {Array<Node[]>} arr - two dimensional array
 * @returns {void}
 */
function render(arr) {
    arr.forEach((element, i) => {
        if (Array.isArray(element)) 
            return render(arr[i]);

        field.appendChild(element);
    });
}


/**
 * Removes all children from the scene.
 * @returns {void}
 */
function cleanScene() {
    field.innerHTML = "";
}


var gameOver = document.querySelector(".game-over");
var damage = document.querySelector(".damage");