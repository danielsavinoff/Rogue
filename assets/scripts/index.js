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
var game = new Array(h)

for (let i = 0; i < game.length; i++) { 
    game[i] = new Array(w) 
}

var exitColIndices = getExitIndices(w, exit_min, exit_max);
var exitRowIndices = getExitIndices(h, exit_min, exit_max);
var roomCoordinates = getRoomIndices(
    w, 
    h, 
    room_min_dimension, 
    room_max_dimension, 
    getRandomNumBetween(room_min, room_max)
);

var entities = {}

for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
        var isRoad = exitColIndices.includes(x) || exitRowIndices.includes(y)

        var isRoom = !isRoad && (
            roomCoordinates.some(function findIntersection(
                element
            ) {
                return(
                    element.x === x &&
                    element.y === y    
                )
        }))
        
        var id = crypto.randomUUID()
        var type = isRoad || isRoom ? path : wall
        var pos = {x,y}

        entities[id] = (type === path) ? new CollidableEntity(id, type, pos) : new Entity(id, type, pos) 
    }
}

/**
 * @param {number} x 
 * @param {number} y 
 * @returns {string}
 */
function getId(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h)
        return undefined

    return game[y][x].id
}

/**
 * @param {{ [id: string]: Entity }} entities
 */
function populate(entities) {
    for (var key in entities) {
        var entity = entities[key]
        
        if (
            ('health' in entity && entity.health < 0) ||
            ('collected' in entity && entity.collected)
        ) {
            var newId = crypto.randomUUID()

            var newEntity = new CollidableEntity(
                newId, 
                path, 
                entity.position
            )

            delete entities[entity.id]
            entities[newId] = newEntity
            entity = newEntity
        }

        var x = entity.position.x
        var y = entity.position.y
        
        game[y][x] = entity
    }
}

var field = document.querySelector(".field");
/**
 * Recursive function that populates the scene
 * @param {Array<Entity[]>} arr - two dimensional array
 */
function render(arr) {
    arr.forEach((entity, i) => {
        if (Array.isArray(entity)) 
            return render(arr[i]);

        if (entity.side && entity.side === 'left') {
            entity.type.classList.add(entity.side)
        } else entity.type.classList.remove('left')

        if (entity.health)
            entity.type.childNodes[0].style.maxWidth = entity.health + '%'
        
        
        field.appendChild(entity.type);
    });
}


/**
 * Removes all children from the scene
 */
function cleanScene() {
    field.innerHTML = "";
}

var damageScreen = document.querySelector(".damage");