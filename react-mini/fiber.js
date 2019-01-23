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

function createFiberFromTypeAndProps() {

}
