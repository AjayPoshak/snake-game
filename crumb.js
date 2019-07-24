import dataKeeper from './data-keeper.js'
class Crumb {
    constructor() {
        this.renderCrumb = this.renderCrumb.bind(this)

        dataKeeper.subscribe(this.renderCrumb)
    }

    removePreviousCrumb() {
        const crumbs = document.getElementsByClassName('__crumb')
        const crumbsList = crumbs ? Array.from(crumbs) : []
        if(crumbsList) {
            crumbsList.map(crumb => crumb.classList.remove('__crumb'))
        }
    }

    renderCrumb(appState) {
        const {crumb} = appState
        this.removePreviousCrumb()
        const crumbPositionOnBoard = document.getElementById(crumb)
        if(crumbPositionOnBoard) {
            crumbPositionOnBoard.classList.add('__crumb')
        }
    }

}

export default Crumb