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
        const {positions, hasCollided} = data
        if(hasCollided) {
            console.log('%c snake has collided', 'background: #222; color: #bada55')
            return false
        }
        this.removePreviousPosition()
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