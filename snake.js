import dataKeeper from './data-keeper.js'

class Snake {
  constructor() {
    this.updatePosition = this.updatePosition.bind(this)
  }

  destroyEye(element) {
    if(element && element.firstChild) element.removeChild(element.firstChild)
  }

  addEye(element) {
    const span = document.createElement('span')
    span.classList.add('eye')
    element.appendChild(span)
  }
 
  removePreviousPosition() {
    const alreadyFills = document.getElementsByClassName('__fill')
    const fillsList = Array.from(alreadyFills)
    fillsList.map(element => {
      this.destroyEye(element)
      element ? element.classList.remove('__fill') : null
      element ? element.removeAttribute('data-snake-index') : null
    })
  }

  renderNewPositions(positions, current_direction) {
    for (let i = 0; i < positions.length; i++) {
      const element = document.getElementById(positions[i])
      if(i === 0) {
        this.addEye(element)
      }
      element ? element.classList.add('__fill') : null
      element ? element.setAttribute('data-snake-index', `${i} ${current_direction}`) : null
    }
  }

  updatePosition(data) {
    const { positions, hasCollided, current_direction } = data
    if (hasCollided) {
      console.log('%c snake has collided', 'background: #222; color: #bada55')
      return false
    }
    this.removePreviousPosition()
    this.renderNewPositions(positions, current_direction)
  }

  init() {
    this.updatePosition(dataKeeper.get())
    dataKeeper.subscribe(this.updatePosition)
  }
}

export default Snake
