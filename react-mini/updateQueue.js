class updateQueue {
  firstUpdate = null
  lastUpdate = null
  constructor(firstUpdate) {
    const node = {
      payload: firstUpdate,
      next: null
    }
    this.firstUpdate = node
    this.lastUpdate = node
  }

  appendUpdate(update) {
    const node = {
      payload: update,
      next: null
    }
    this.lastUpdate.next = node
    this.lastUpdate = node
    return node
  }

  merge() {
    // todo
  }
}

export {
  updateQueue
}
