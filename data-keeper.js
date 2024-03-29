/**
 * Each position on board is marked with a number
 * from 0:0, 0:1, 0:2,....,0:9 to 9:0, 9:1, 9:2,......,9:9
 */
class DataKeeper {
  static instance
  constructor() {
    if (typeof instance !== 'undefined') {
      return instance
    }
    this.snakeLength = 3
    this.MAX_COLUMNS = 10
    this.MAX_ROWS = 10
    // Express snake position as cell number
    this.initialPositions = ['0:7', '0:8', '0:9']
    this.listeners = []
    this.state = {
      crumb: '',
      hasCollided: false,
      hasCrumbBeenEaten: false,
      current_direction: 'MOVE_LEFT',
      positions: this.initialPositions,
    }
  }

  /**
   * For any given position and direction, it determines
   * the next position of snake
   * @param {*} direction
   * @param {*} x
   * @param {*} y
   */
  determinePosition(direction, x, y) {
    switch (direction) {
      case 'MOVE_LEFT': {
        y -= 1 // Move to Left
        break
      }

      case 'MOVE_RIGHT': {
        y += 1 // Move to Right
        break
      }

      case 'MOVE_UP': {
        x -= 1
        break
      }

      case 'MOVE_DOWN': {
        x += 1
        break
      }
    }
    return { x, y }
  }

  /**
   * For any given position and direction, it detects
   * if snake has collided to fence or not.
   * @param {*} direction
   * @param {*} x
   * @param {*} y
   */
  detectCollision(direction, x, y) {
    let hasCollided = false
    switch (direction) {
      case 'MOVE_LEFT': {
        if (y < 0) {
          hasCollided = true
        }
        break
      }

      case 'MOVE_RIGHT': {
        if (y > this.MAX_COLUMNS - 1) {
          hasCollided = true
        }
        break
      }

      case 'MOVE_UP': {
        if (x < 0) {
          hasCollided = true
        }
        break
      }

      case 'MOVE_DOWN': {
        if (x > this.MAX_COLUMNS - 1) {
          hasCollided = true
        }
        break
      }
    }
    return hasCollided
  }

  /**
   * Moves snake around the board. For any given direction,
   * it determines the next position on board & also
   * detects if snake has collided to the fence.
   * @param {*} positions
   * @param {*} direction
   */
  moveSnake(crumb, positions, direction) {
    let [xPos, yPos] = positions[0].split(':')
    let x = parseInt(xPos, 10)
    let y = parseInt(yPos, 10)

    const { x: updatedX, y: updatedY } = this.determinePosition(direction, x, y)
    const hasCollided = this.detectCollision(direction, updatedX, updatedY)

    // Check if snake is eating the crumb in new position
    const ifCrumbIsEaten = this.checkIfCrumbIsEaten(crumb, updatedX, updatedY)
    // @TODO: Increase snake's length if crumb is eaten

    /**
     * Remove last position if snake is just moving around.
     * In case he has eaten the crumb, then do not remove
     * the tail from snake because now its length has been
     * increased.
     */
    if (ifCrumbIsEaten === false) {
      positions.pop()
    }
    // Add new position
    positions.unshift(`${updatedX}:${updatedY}`)
    return { positions, hasCollided, hasCrumbBeenEaten: ifCrumbIsEaten }
  }

  move(state, direction) {
    const { positions, crumb } = state
    const {
      positions: newPositions,
      hasCollided,
      hasCrumbBeenEaten,
    } = this.moveSnake(crumb, positions, direction)

    return {
      hasCollided,
      hasCrumbBeenEaten,
      positions: newPositions,
      current_direction: direction,
    }
  }

  dispatch(dispatchedEvent) {
    const { type } = dispatchedEvent
    const state = { ...this.state }
    switch (type) {
      case 'MOVE_LEFT': {
        const newState = this.move(state, type)
        this.state = { ...state, ...newState }
        break
      }

      case 'MOVE_RIGHT': {
        const newState = this.move(state, type)
        this.state = { ...state, ...newState }
        break
      }

      case 'MOVE_UP': {
        const newState = this.move(state, type)
        this.state = { ...state, ...newState }
        break
      }

      case 'MOVE_DOWN': {
        const newState = this.move(state, type)
        this.state = { ...state, ...newState }
        break
      }

      case 'GENERATE_CRUMB': {
        const newState = this.generateCrumb(state)
        // Setting hasCrumbBeenEaten to false, so that it resets state for new crumb
        this.state = { ...newState, hasCrumbBeenEaten: false }
        break
      }

      case 'DO_NOTHING':
        break
    }
    this.callSubscribers(this.state)
  }

  generateCrumbCoords() {
    const row = Math.round((Math.random() * 100) % (this.MAX_ROWS - 1))
    const column = Math.round((Math.random() * 100) % (this.MAX_COLUMNS - 1))
    const crumb = `${row}:${column}`
    return crumb
  }

  generateCrumb = (state) => {
    const {positions} = state
    let crumb = this.generateCrumbCoords()
    // Keep generating crumb until the generated crumb is not on snake
    // Fun fact: A snake cannot eat crumb which is placed on its skin 😉
    while (positions.includes(crumb) === true) {
      crumb = this.generateCrumbCoords()
    }
    return { ...state, crumb }
  }

  checkIfCrumbIsEaten(crumb, x, y) {
    const [xPosCrumb, yPosCrumb] = crumb.split(':')
    if (xPosCrumb == x && yPosCrumb == y) {
      return true
    }
    return false
  }

  subscribe(func) {
    this.listeners.push(func)
  }

  callSubscribers(data) {
    this.listeners.map(listener => listener(data))
  }

  get() {
    return this.state
  }
}

export default new DataKeeper()
