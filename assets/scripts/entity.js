/**
 * @typedef {object} Position
 * @prop {number} x
 * @prop {number} y
 */

/**
 * @param {string} id 
 * @param {Node} type 
 * @param {Position} position 
 */
function Entity(
  id,
  type,
  position
) {
  this.id = id
  this.type = type.cloneNode(true)
  this.position = position
  this.collision = false
}

/**
 * @param {string} id 
 * @param {Node} type 
 * @param {Position} position 
 */
function CollidableEntity(
  id,
  type,
  position
) {
  Entity.call(this, id, type, position)
  this.collision = true
}

Object.setPrototypeOf(CollidableEntity.prototype, Entity.prototype)

/**
 * Object consisting key of {@link ActiveEntity} 
 * @typedef {object} Effect
 * @prop {any} key 
 */

/**
 * @param {string} id 
 * @param {Node} type 
 * @param {Position} position 
 * @param {boolean} collected 
 * @param {ActiveEntity} forEntity
 * @param {Effect} effect
 * @param {number} maxEffectTime time in ms
 */
function CollectableEntity(
  id,
  type,
  position,
  collected,
  forEntity,
  effect,
  maxEffectTime
) {
  CollidableEntity.call(this, id, type, position)
  this.collected = collected
  this.forEntity = forEntity
  this.effect = effect
  this.maxEffectTime = maxEffectTime || 0
}

Object.setPrototypeOf(CollectableEntity.prototype, CollidableEntity.prototype)

/**
 * @param {string} id 
 * @param {Node} type 
 * @param {Position} position
 * @param {number} health 
 * @param {number} damage 
 * @param {number} damageMultiplicator
 * @param {'left' | ''} side
 */
function ActiveEntity(
  id,
  type,
  position,
  health,
  damage,
  damageMultiplicator,
  side
) {
  Entity.call(this, id, type, position)
  this.health = health
  this.damage = damage
  this.damageMultiplicator = damageMultiplicator || 1.0
  this.side = side || ''
}

var moveAction = {
  /**
   * @param {Entity} destination  
   */
  move(destination) {
    if (!destination.collision) return
    
    var forEntity = 'forEntity' in destination && destination.forEntity
    
    if (
      forEntity &&
      !(this instanceof forEntity) 
    ) return
    
    var oldPosition = this.position
    this.position = destination.position
    destination.position = oldPosition

    var difference = oldPosition.x - this.position.x
    
    if ('collected' in destination) {
      destination.collected = true
      
      if (destination.effect) {
        var previousKeyValue
        var currentEntity = this

        for (var key in destination.effect) {
          previousKeyValue = this[key]
          this[key] = destination.effect[key]
          
          if (destination.maxEffectTime) {
            
            setTimeout(function removeEffect() {
              currentEntity[key] = previousKeyValue
            }, destination.maxEffectTime)
          }
        }
      }
    }

    if (difference === 0) return
    this.side = difference < 0 ? '' : 'left'
  }
}

var attackAction = {
  /**
   * @param {ActiveEntity} target 
   */
  attack(target) {
    if (!(target instanceof ActiveEntity))
    return
    console.log(this.damage, this.damageMultiplicator)
    target.takeDamage(this.damage * this.damageMultiplicator)
  }
}

var takeDamageAction = {
  /**
   * @param {number} dmg 
   */
  takeDamage(dmg) {
    this.health -= dmg
  }
}

Object.assign(ActiveEntity.prototype, takeDamageAction)
Object.assign(ActiveEntity.prototype, attackAction)
Object.assign(ActiveEntity.prototype, moveAction)
Object.setPrototypeOf(ActiveEntity.prototype, Entity.prototype)

/**
 * @param {string} id 
 * @param {Node} type 
 * @param {Position} position
 * @param {number} health 
 * @param {number} damage 
 * @param {number} damageMultiplicator
 * @param {'left' | ''} side
 */
function Character(
  id,
  type,
  position,
  health,
  damage,
  damageMultiplicator,
  side
) {
  ActiveEntity.call(
    this, 
    id, 
    type, 
    position, 
    health, 
    damage, 
    damageMultiplicator, 
    side
  )
}

Object.setPrototypeOf(Character.prototype, ActiveEntity.prototype)

/**
 * @param {string} id 
 * @param {Node} type 
 * @param {Position} position
 * @param {number} health 
 * @param {number} damage 
 * @param {number} damageMultiplicator
 * @param {'left' | ''} side
 * @param {number} multiplicatorExpiresAt
 */
function Enemy(
  id,
  type,
  position,
  health,
  damage,
  damageMultiplicator,
  side,
) {
  ActiveEntity.call(
    this, 
    id, 
    type, 
    position, 
    health, 
    damage, 
    damageMultiplicator, 
    side
  )
}

Object.setPrototypeOf(Enemy.prototype, ActiveEntity.prototype)