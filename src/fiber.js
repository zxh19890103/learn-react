class FiberNode {
  static id = 0
  constructor(name, child, sibling, parent) {
    this.child = child
    this.sibling = sibling
    this.parent = parent
    this.id = ++ FiberNode.id
    this.name = name
    this.performed = false
  }
}

/**
 * ---------------------------------------------
 *
 * ---------------------------------------------
 */

const names = [
  'root',
  'a0', 'a1',
  'b0', 'b1', 'b2',
  'c0',
  'd0', 'd1'
]

const [
  root,
  a0, a1,
  b0, b1, b2,
  c0,
  d0, d1
] = new Array(9).fill(0).map((n, i) => {
  return new FiberNode(names[i], null, null, null)
})

root.child = a0
a0.sibling = a1
a0.parent = a1.parent = root

a1.child = b0
b0.sibling = b1
b1.sibling = b2
b0.parent = b1.parent = b2.parent = a1

b1.child = c0
c0.parent = b1

c0.child = d0
d0.sibling = d1
d0.parent = d1.parent = c0

let current = null

const performUnitOfWork = (node) => {
  // do perform
  console.log('Perform', node.name)
  if (node.child) {
    console.log('Down', node.child.name)
    return node.child
  } else if (node.sibling) {
    console.log('Right', node.sibling.name)
    return node.sibling
  } else {
    let parent = node.parent
    let safe = 0
    while (parent) {
      console.log('Up', parent.name)
      if (parent.sibling) {
        console.log('Right', parent.sibling.name)
        return parent.sibling
      }
      parent = parent.parent
      safe ++
      if (safe > 1000) break
    }
    return null
  }
}

const walk = (node) => {
  let next = performUnitOfWork(node)
  while (next) {
    next = performUnitOfWork(next)
  }
}

//walk(root)

// console.log(root)
