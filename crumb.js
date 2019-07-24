import dataKeeper from './data-keeper.js'
class Crumb {
  constructor() {
    this.updateUI = this.updateUI.bind(this)
    this.renderCrumb = this.renderCrumb.bind(this)

    dataKeeper.subscribe(this.updateUI)
  }

  removePreviousCrumb() {
    const crumbs = document.getElementsByClassName('__crumb')
    const crumbsList = crumbs ? Array.from(crumbs) : []
    if (crumbsList) {
      crumbsList.map(crumb => crumb.classList.remove('__crumb'))
    }
  }

  renderCrumb(crumb) {
    this.removePreviousCrumb()
    const crumbPositionOnBoard = document.getElementById(crumb)
    if (crumbPositionOnBoard) {
      crumbPositionOnBoard.classList.add('__crumb')
    }
  }

  updateUI(appState) {
    const { crumb, hasCrumbBeenEaten = false } = appState
    // If existing crumb has been eaten, then remove it from board
    if (hasCrumbBeenEaten) {
      this.removePreviousCrumb()
      dataKeeper.dispatch({ type: 'GENERATE_CRUMB' })
    } else {
      this.renderCrumb(crumb)
    }
  }
}

export default Crumb
