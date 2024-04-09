for (var i = 0; i < enemy_max; i++) {
  var id = crypto.randomUUID()
  var node = enemy

  var foundEntities = findEntity(entities, CollidableEntity)
  var randomIndex = Math.floor(Math.random() * (foundEntities.length - 1))
  var entityToSubstitute = foundEntities[randomIndex]

  var pos = entityToSubstitute.position
  var health = 100
  var damage = enemy_power

  var enemyInstance = new Enemy(id, node, pos, health, damage, 1.0)

  delete entities[entityToSubstitute.id]
  entities[id] = enemyInstance
}

var enemyIntervalId = setInterval(function controlEnemy() {
  var enemyEntities = findEntity(entities, Enemy)

  enemyEntities.forEach(function moveOrAttack(entity) {
    var targetIdTop = getId(entity.position.x, entity.position.y - 1)
    var targetIdBottom = getId(entity.position.x, entity.position.y + 1)
    var targetIdLeft = getId(entity.position.x - 1, entity.position.y)
    var targetIdRight = getId(entity.position.x + 1, entity.position.y)

    if (
      (targetIdTop && entities[targetIdTop] instanceof Character) ||
      (targetIdBottom && entities[targetIdBottom] instanceof Character) ||
      (targetIdLeft && entities[targetIdLeft] instanceof Character) ||
      (targetIdRight && entities[targetIdRight] instanceof Character)
    ) {
      entity.attack(entities[targetIdTop])
      entity.attack(entities[targetIdBottom])
      entity.attack(entities[targetIdLeft])
      entity.attack(entities[targetIdRight])

      damageScreen.classList.remove("hidden")
      setTimeout(function hideDamage() {
        damageScreen.classList.add("hidden")
      }, 500)
    } else {
      var axis = Math.random() > 0.5 ? "x" : "y"
      var step = Math.random() > 0.5 ? 1 : -1

      var targetPosition = {
        position: {
          x: entity.position.x,
          y: entity.position.y,
          [axis]: entity.position[axis] + step,
        },
      }

      if (
        targetPosition.position.x < 0 ||
        targetPosition.position.x >= w ||
        targetPosition.position.y < 0 ||
        targetPosition.position.y >= h
      ) return

      var targetId = getId(targetPosition.position.x, targetPosition.position.y)

      entity.move(entities[targetId])
    }
  })
}, 750)
