import {
  isValidReactElement,
  isConstantElement,
  ELEMENT_TAG
} from './shared'

let nextUnitOfWork = null

function FiberNode(
  tag,
  pendingProps,
  key,
  mode,
) {
  // Instance
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null
  this.stateNode = null

  // Fiber
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0

  this.ref = null

  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.firstContextDependency = null

  this.mode = mode

  // Effects
  this.effectTag = 0
  this.nextEffect = null

  this.firstEffect = null
  this.lastEffect = null

  this.expirationTime = 0
  this.childExpirationTime = 0

  this.alternate = null
}

FiberNode.prototype.toString = function() {
  if (typeof this.type === 'function') {
    return `${this.tag} - ${this.type.name}`
  } else {
    return `${this.tag} - ${this.type}`
  }
}

function performUnitOfWork(workInProgress) {
  let instance = workInProgress.stateNode
  const {
    tag,
    type,
    pendingProps
   } = workInProgress
  let children = null
  switch (tag) {
    case ELEMENT_TAG.hostElement: {
      if (!instance) {
        instance = document.createElement(type)
        workInProgress.stateNode = instance
      }
      children = pendingProps.children
      break
    }
    case ELEMENT_TAG.classElement: {
      if (!instance) {
        instance = new type(pendingProps)
        instance._updater = workInProgress
        workInProgress.stateNode = instance
      }
      children = boxAsChildren(instance.render())
      break
    }
    case ELEMENT_TAG.functionElement: {
      children = boxAsChildren(type(pendingProps))
      break
    }
    case ELEMENT_TAG.textElement: {
      workInProgress.stateNode = document.createTextNode(pendingProps.value)
      break
    }
    default: {
      break
    }
  }

  if (children) {
    // create links to parent
    const firstChild = children.reduceRight((previous, current) => {
      const child = createFiberNode(current)
      child.return = workInProgress
      child.sibling = previous
      return child
    }, null)
    workInProgress.child = firstChild
  }

  // find the next unit of work.
  nextUnitOfWork = getTheNextUnitOfWork(workInProgress)
  workInProgress.nextEffect = nextUnitOfWork
  return nextUnitOfWork
}

function boxAsChildren(children) {
  if (Array.isArray(children)) {
    return children
  } else {
    return [children]
  }
}

function getTheNextUnitOfWork(workInProgress) {
  const childFiber = workInProgress.child
  if (childFiber) {
    return childFiber
  } else {
    let safe = 0
    while (true && safe < 100) {
      safe ++
      let siblingFiber = workInProgress.sibling
      let returnFiber = workInProgress.return
      if (siblingFiber !== null) {
        return siblingFiber
      } else if (returnFiber !== null) {
        workInProgress = returnFiber
        continue
      } else {
        return null
      }
    }
  }
}

function createConstantFiberNode(value) {
  const props = {
    value
  }
  const node = new FiberNode(ELEMENT_TAG.textElement, props, null, null)
  node.type = null
  return node
}

function createFiberNode(element) {
  if (isConstantElement(element)) {
    return createConstantFiberNode(element)
  }
  const {
    tag,
    type,
    props
  } = element
  const node = new FiberNode(tag, props, null, null)
  node.type = type
  return node
}

function cloneFiberNode(fiber, element) {
  const copy = new FiberNode(fiber.tag, null, null, null)
  copy.type = fiber.type
  copy.return = fiber.return
  copy.pendingProps = element.props
  return copy
}

function workLoop() {
  while (nextUnitOfWork !== null) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
}

function startWorkLoopFromElement(element) {
  const fiberRoot = createFiberNode(element)
  nextUnitOfWork = fiberRoot
  setTimeout(() => {
    workLoop()
  }, 0)
  return fiberRoot
}

export {
  FiberNode,
  startWorkLoopFromElement
}
