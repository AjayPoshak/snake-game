import dataKeeper from './data-keeper.js'

class Snake {
  constructor() {
    this.fillClassName = '__fill'
    this.snakeBodyAttribute = 'data-body-part'
    this.updatePosition = this.updatePosition.bind(this)
    this.removePreviousPosition = this.removePreviousPosition.bind(this)
  }

  removePreviousPosition() {
    const alreadyFills = document.getElementsByClassName(this.fillClassName)
    const fillsList = Array.from(alreadyFills)
    fillsList.map(element => {
      element ? element.classList.remove(this.fillClassName) : null
      element ? element.removeAttribute(this.snakeBodyAttribute) : null
    })
  }

  updatePosition(data) {
    const { positions, hasCollided } = data
    if (hasCollided) {
      console.log('%c snake has collided', 'background: #222; color: #bada55')
      return false
    }
    this.removePreviousPosition()
    for (let i = 0; i < positions.length; i++) {
      const element = document.getElementById(positions[i])
      element ? element.classList.add(this.fillClassName) : null
      element ? element.setAttribute(this.snakeBodyAttribute, i) : null
    }
  }

  init() {
    this.updatePosition(dataKeeper.get())
    dataKeeper.subscribe(this.updatePosition)
  }
}

export default Snake
