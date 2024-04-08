for (var i = 0; i < swords_max; i++) {
    var id = crypto.randomUUID()
    var type = sword

    var foundEntities = findEntity(
        entities, 
        CollidableEntity
    )
    var randomIndex = Math.floor(
        Math.random() * (foundEntities.length - 1)
    )
    var entityToSubstitute = foundEntities[randomIndex]

    var swordEntity = new CollectableEntity(
        id , 
        type,
        entityToSubstitute.position,
        false,
        Character,
        { damageMultiplicator: 2.0 },
        7500
    )

    delete entities[entityToSubstitute.id]
    entities[id] = swordEntity
}

for (var i = 0; i < hp_max; i++) {
    var id = crypto.randomUUID()
    var type = hp

    var foundEntities = findEntity(
        entities, 
        CollidableEntity
    )
    var randomIndex = Math.floor(
        Math.random() * (foundEntities.length - 1)
    )
    var entityToSubstitute = foundEntities[randomIndex]

    var hpEntity = new CollectableEntity(
        id, 
        type, 
        entityToSubstitute.position,
        false,
        Character,
        { health: 100 }
    )

    delete entities[entityToSubstitute.id]
    entities[id] = hpEntity
}