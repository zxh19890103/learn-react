class FiberNode {
  static id = 0
  stateNode = null
  element = null
  constructor(child, sibling, parent, element) {
    this.id = ++ FiberNode.id
    this.child = child
    this.sibling = sibling
    this.parent = parent
    this.element = element
  }
}

const fiberTree = {
  $$root: true,
  $$container: null,
  root: new FiberNode(null, null, null)
}

const findDOMContainer = (node) => {
  let alter = node.parent
  while (alter) {
    const element = alter.element
    if (element.elementType === 'tag') {
      return alter.stateNode
    }
    alter = alter.parent
  }
  return fiberTree.$$container
}

const performUnitOfWork = (node) => {
  // do perform
  console.log('@doWork', node.stateNode)
  // const domContainer = findDOMContainer(node)
  // const { element, stateNode } = node
  // if (element.elementType === 'tag') {
  //   domContainer.appendChild(stateNode)
  // }

  if (node.child) {
    console.log('Down', node.child.stateNode)
    return node.child
  } else if (node.sibling) {
    console.log('Right', node.sibling.stateNode)
    return node.sibling
  } else {
    let parent = node.parent
    let safe = 0
    while (parent) {
      console.log('Up', parent.stateNode)
      if (parent.sibling) {
        console.log('Right', parent.sibling.stateNode)
        return parent.sibling
      }
      parent = parent.parent
      safe ++
      if (safe > 1000) break
    }
    return null
  }
}

const workLoop = (node, buildFiberTree) => {
  buildFiberTree(node)
  let next = performUnitOfWork(node)
  while (next) {
    buildFiberTree(next)
    next = performUnitOfWork(next)
  }
}

export {
  FiberNode,
  fiberTree,
  workLoop
}
