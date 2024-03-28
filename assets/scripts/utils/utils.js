/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number} 
 */
function getRandomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * @param {number} w - width of the scene
 * @param {number} h - height of the scene
 * @param {number} room_min_dimension - minimum height or width of the room 
 * @param {number} room_max_dimension - minimum height or width of the room 
 * @param {number} amount - amount of rooms
 * @returns {Array<{x: number, y: number}>}
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
 * @returns {Array<number>}
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


/**
 * @param {Array<Node[]>} array - two-dimensional array
 * @param {Node} element - an element, indicies of which are being searched
 * @returns {Array<{x: number, y: number}>}
 */
function findElementIndices(array, element) {
    var indices = [];

    for (var y = 0; y < array.length; y++) {
        for (var x = 0; x < array[y].length; x++) {
            if (element.isEqualNode(array[y][x])) {
                indices.push({x, y});
            }
        }
    }

    return indices;
}


/**
 * Returns needed amount of indices out of 
 * the pool array. 
 * 
 * @param {Array<{x: number, y: number}>} pool 
 * @param {number} amount - length of return array
 * @returns {Array<{x: number, y: number}>} 
 */
function getRandomIndices(pool, amount) {
    var indices = [];

    for (var i = 0; i < amount; i++) {
        var randomIndex = Math.floor(
            Math.random() * pool.length
        );
        
        indices.push(pool[randomIndex]);
        pool.splice(randomIndex, 1);
    }

    return indices;
}
