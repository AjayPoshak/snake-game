import dataKeeper from './data-keeper.js'

class Snake {
    constructor() {
        this.updatePosition = this.updatePosition.bind(this)
    }

    removePreviousPosition() {
        const alreadyFills = document.getElementsByClassName('__fill')
        const fillsList = Array.from(alreadyFills)
        fillsList.map(element => {
            element ? element.classList.remove("__fill"): null
        });
    }

    updatePosition(data) {
        console.log('updatePosition')
        this.removePreviousPosition()
        const {positions, currentDirection} = data
        for(let i=0; i<positions.length; i++) {
            const element = document.getElementById(positions[i])
            element ? element.classList.add('__fill') : null
        }
    }

    init() {
        this.updatePosition(dataKeeper.get())
        dataKeeper.subscribe(this.updatePosition)
    }
}

export default Snake