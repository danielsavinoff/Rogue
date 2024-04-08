var id = crypto.randomUUID()
var type = player

var foundEntities = findEntity(entities, CollidableEntity)
var randomIndex = Math.floor(Math.random() * (foundEntities.length - 1))
var entityToSubstitute = foundEntities[randomIndex]

var pos = entityToSubstitute.position
var health = 100
var damage = player_power

var character = new Character(id, type, pos, health, damage, 1.0, null)

delete entities[entityToSubstitute.id]
entities[id] = character

document.addEventListener("keyup", function listener(event) {
  var code = event.code

  switch (code) {
    case "KeyW":
      if (character.position.y === 0) return

      var targetId = getId(character.position.x, character.position.y - 1)

      character.move(entities[targetId])

      break
    case "KeyA":
      if (character.position.x === 0) return

      var targetId = getId(character.position.x - 1, character.position.y)

      character.move(entities[targetId])

      break
    case "KeyD":
      if (character.position.x === w - 1) return

      var targetId = getId(character.position.x + 1, character.position.y)

      character.move(entities[targetId])

      break
    case "KeyS":
      if (character.position.y === h - 1) return

      var targetId = getId(character.position.x, character.position.y + 1)

      character.move(entities[targetId])

      break
    case "Space":
      var targetIdTop = getId(character.position.x, character.position.y - 1)
      var targetIdBottom = getId(character.position.x, character.position.y + 1)
      var targetIdLeft = getId(character.position.x - 1, character.position.y)
      var targetIdRight = getId(character.position.x + 1, character.position.y)

      targetIdTop && character.attack(entities[targetIdTop])
      targetIdBottom && character.attack(entities[targetIdBottom])
      targetIdLeft && character.attack(entities[targetIdLeft])
      targetIdRight && character.attack(entities[targetIdRight])

      break
  }
})
