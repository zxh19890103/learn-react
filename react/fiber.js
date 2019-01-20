class FiberNode {
  static id = 0
  stateNode = null
  constructor(child, sibling, parent) {
    this.child = child
    this.sibling = sibling
    this.parent = parent
    this.id = ++ FiberNode.id
  }
}

const fiberTree = new FiberNode(null, null, null)

export {
  FiberNode,
  fiberTree
}
