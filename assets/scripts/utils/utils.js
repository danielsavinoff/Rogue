/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number} 
 */
function getRandomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @typedef {object} Position
 * @prop {number} x
 * @prop {number} y
 */

/**
 * @param {number} w - width of the scene
 * @param {number} h - height of the scene
 * @param {number} room_min_dimension - minimum height or width of the room 
 * @param {number} room_max_dimension - minimum height or width of the room 
 * @param {number} amount - amount of rooms
 * @returns {Position[]}
 */
function getRoomIndices(
    w, 
    h, 
    room_min_dimension, 
    room_max_dimension,
    amount
) {
    var indices = [];

    for (var i = 0; i < amount; i++) {
        var oneUniqueRoomIndices = [];
        
        unique: while (!oneUniqueRoomIndices.length) {
            var startX = Math.floor(Math.random() * w);
            var startY = Math.floor(Math.random() * h);

            var roomWidth = getRandomNumBetween(room_min_dimension, room_max_dimension);
            var roomHeight = getRandomNumBetween(room_min_dimension, room_max_dimension);

            var endX = Math.min(startX + roomWidth, w - 1);
            var endY = Math.min(startY + roomHeight, h - 1);

            var oneRoomIndices = [];

            for (var x = startX; x < endX; x++) {
                for (var y = startY; y < endY; y++) {
                    if (indices.some(
                        function findDeepIntersection(
                            element
                        ) {
                            const dx = Math.abs(element.x - x);
                            const dy = Math.abs(element.y - y);

                            return (
                                (dx <= 1 && dy <= 1) &&
                                (dx === 0 || dy === 0)
                            );
                        }
                    )) {    
                        continue unique;
                    } else {
                        oneRoomIndices.push({x, y});
                    }
                }
            }

            oneUniqueRoomIndices = oneUniqueRoomIndices.concat(oneRoomIndices);
        }

        indices = indices.concat(oneUniqueRoomIndices);
    }
    
    return indices;
}


/**
 * @param {number} maxTiles
 * @param {number} min 
 * @param {number} max 
 * @returns {number[]}
 */
function getExitIndices(maxTiles, min, max) {
    var indices = [];

    for (var i = 0; i < getRandomNumBetween(min, max); i++) {
        
        var index;

        do {
            index = Math.floor(Math.random() * (maxTiles - 2)) + 1;
        } while (
            indices.includes(index) ||
            indices.includes(index + 1) ||
            indices.includes(index - 1) 
        );
    
        indices.push(index);

    }

    return indices;
}


function findEntity(entities, entity) {
    var foundEntities = [];

    for (var key in entities) {
        if (entities[key] instanceof entity) 
            foundEntities.push(entities[key])
    }

    return foundEntities;
}