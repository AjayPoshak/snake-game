import Snake from './snake.js'
import dataKeeper from './data-keeper.js'
class Render {
    constructor({ root }) {
        this.rows = 10
        this.columns = 10
        this.refreshTime = 2000
        this.removeTimer = null
        this.lastAction = 'MOVE_LEFT'
        this.root = root || document.getElementById('root')
        if(!root) {
            throw new Error('Expected a root element')
        }
        this.updateUI = this.updateUI.bind(this)
    }

    generateColumns(rowNumber) {
        let columnElements = ''
        for(let i=0; i<this.columns; i++) {
            columnElements += `<li class='column' id='${rowNumber}:${i}'></li>`
        }
        return columnElements
    }

    generateRows() {
        let rows = ''
        for(let i=0; i<this.rows; i++) {
            rows += `<ul class='row'>${this.generateColumns(i)}</ul>`
        }
        return rows
    }

    createBoard() {
        const board = this.generateRows()

        const boardContainer = document.createElement('section')
        boardContainer.classList.add('board')
        boardContainer.insertAdjacentHTML('beforeend', board)

        const fragment = document.createDocumentFragment()
        fragment.appendChild(boardContainer)

        this.root.appendChild(fragment)
    }

    userInputHandler(event) {
        const {key} = event
        switch(key) {
            case "ArrowRight": {
                if(this.lastAction === 'MOVE_RIGHT' || this.lastAction === 'MOVE_LEFT') return false

                this.lastAction = 'MOVE_RIGHT'
                dataKeeper.dispatch({ type: 'MOVE_RIGHT' })
                break;
            }

            case "ArrowLeft": {
                if(this.lastAction === 'MOVE_LEFT' || this.lastAction === 'MOVE_RIGHT') return false

                this.lastAction = 'MOVE_LEFT'
                dataKeeper.dispatch({ type: 'MOVE_LEFT' })
                break;
            }

            case "ArrowUp": {
                if(this.lastAction === 'MOVE_UP' || this.lastAction === 'MOVE_DOWN') return false

                this.lastAction = 'MOVE_UP'
                dataKeeper.dispatch({ type: 'MOVE_UP' })
                break;
            }

            case "ArrowDown": {
                if(this.lastAction === 'MOVE_DOWN' || this.lastAction === 'MOVE_UP' ) return false

                this.lastAction = 'MOVE_DOWN'
                dataKeeper.dispatch({ type: 'MOVE_DOWN' })
                break;
            }

            default: {
                dataKeeper.dispatch({ type: 'DO_NOTHING' })
                break;
            }
        }
    }

    updateUIAfterInterval() {
        console.log('calling updateUIAfterInterval ', this.lastAction)
        dataKeeper.dispatch({type: this.lastAction})
    }

    playGame(evt) {
        this.removeTimer = timer(this.updateUIAfterInterval.bind(this), this.refreshTime)
    }

    pauseGame(evt) {
        this.removeTimer && this.removeTimer()
    }

    updateUI(data) {
        const {hasCollided} = data
        if(hasCollided === true) {
            this.pauseGame()
        }
    }

    init() {
        this.createBoard()
        const snake = new Snake()
        snake.init()
        window.addEventListener('keyup', this.userInputHandler.bind(this))
        const play = document.getElementById('play')
        if(play) {
            play.addEventListener('click', this.playGame.bind(this))
        }
        const pause = document.getElementById('pause')
        if(pause) {
            pause.addEventListener('click', this.pauseGame.bind(this))
        }
        dataKeeper.subscribe(this.updateUI)
    }
}

export default Render

export function timer(func, delay) {
    let timeout = ''
    timeout = setInterval(() => {
        func()
    }, delay)
    return () => clearInterval(timeout)
}