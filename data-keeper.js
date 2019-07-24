/** 
 * Each position on board is marked with a number
 * from 0:0, 0:1, 0:2,....,0:9 to 9:0, 9:1, 9:2,......,9:9
*/
class DataKeeper {
    static instance
    constructor() {
        // console.log('this.instance ',this.instance)
        if(typeof instance !== 'undefined') {
            return instance
        }
        this.snakeLength = 3
        this.MAX_COLUMNS = 10
        this.MAX_ROWS = 10
        // Express snake position as cell number
        this.initialPositions = ["0:7", "0:8", "0:9"]
        this.positions = []
        this.listeners = []
        this.state = {
            current_direction: 'MOVE_LEFT',
            positions: this.initialPositions
        }
    }

    determinePosition(positions, direction) {
        console.log('determinePosition ', positions, direction)
        let [xPos, yPos] = positions[0].split(':')
        let x = parseInt(xPos, 10)
        let y = parseInt(yPos, 10)
        let hasCollided = false
        switch(direction) {
            case 'MOVE_LEFT': {
                y -= 1 // Move to Left
                if(y < 0) {
                    hasCollided = true
                }
                break
            }

            case 'MOVE_RIGHT': {
                y += 1 // Move to Right
                if(y > this.MAX_COLUMNS-1) {
                    hasCollided = true
                }
                break
            }

            case 'MOVE_UP': {
                x -= 1
                if(x < 0) {
                    hasCollided = true
                }
                break
            }

            case 'MOVE_DOWN': {
                x += 1
                if(x > this.MAX_COLUMNS-1) {
                    hasCollided = true
                }
                break
            }
        }
        // Remove last position
        positions.pop()
        // Add new position
        positions.unshift(`${x}:${y}`)
        return {positions, hasCollided}
    }

    move(state, direction) {
        const { positions } = state
        const {positions: newPositions, hasCollided} = this.determinePosition(positions, direction)
        return ({ positions: newPositions, current_direction: direction, hasCollided })
    }

    dispatch(dispatchedEvent) {
        console.log('dispatchedEvent ', dispatchedEvent)
        const {type} = dispatchedEvent
        const state = {...this.state}
        switch(type) {
            case 'MOVE_LEFT': {
                const newState = this.move(state, type)
                this.state = {...newState}
                break;
            }

            case 'MOVE_RIGHT': {

                const newState = this.move(state, type)
                this.state = {...newState}
                break;
            }

            case 'MOVE_UP': {
                const newState = this.move(state, type)
                this.state = {...newState}
                break;
            }

            case 'MOVE_DOWN':  {
                const newState = this.move(state, type)
                this.state = {...newState}
                break;
            }
   
            case 'DO_NOTHING': break;
        }

        console.log('updated state ', this.state)
        this.callSubscribers(this.state)
    }

    subscribe(func) {
        this.listeners.push(func)
    }

    callSubscribers(data) {
        console.log(this.listeners)
        this.listeners.map(listener => listener(data))
    }

    get() {
        return this.state
    }
}

export default new DataKeeper()