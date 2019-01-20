import {
  fiberTree,
  FiberNode,
  workLoop
} from './fiber'

import {
  isValidDOMElement,
  isValidReactElement,
  REACT_ELEMENT_TYPE,
  REACT_FUNCTION_ELEMENT
} from './is'

class Component {
  constructor(props, children) {
    this.props = props || {}
    this.children || []
    this.state = {}
  }

  setState(update) {
  }

  render() {
    return null
  }
}

const elementFactory = (type, props, children, elementType) => {
  const flatChildren = []
  children.forEach(child => {
    if (child instanceof Array) {
      flatChildren.push(...child)
    } else {
      flatChildren.push(child)
    }
  })
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    props,
    children: flatChildren,
    elementType,
  }
  return element
}

function createElement(type, config, ...children) {
  const props = { }
  const typeofString = typeof type
  Object.assign(props, config)
  if (typeofString === 'string') {
    return elementFactory(type, props, children, 'tag')
  } else if (typeofString === 'function') {
    if (type.prototype instanceof Component) {
      return elementFactory(type, props, children, 'component')
    } else {
      return elementFactory(type, props, children, 'function')
    }
  } else {
    throw new Error(`A valid type: ${typeofString}`)
  }
}

function getElementInstance(element) {
  const { type, elementType, props, children } = element
  switch (elementType) {
    case 'tag': {
      const hostElement = document.createElement(type)
      let propName = null
      for (propName in props) {
        if (propName in hostElement) {
          hostElement[propName] = props[propName]
        } else {
          hostElement.setAttribute(propName, props[propName])
        }
      }
      return hostElement
    }
    case 'component': {
      const instance = new type(props, children)
      return instance
    }
    case 'function': {
      return REACT_FUNCTION_ELEMENT
    }
  }
  return null
}

/**
 * Make the tree of React Elements
 * Make the tree of Fiber nodes
 */
function ________walk(element, fiberNode) {
  if (!isValidReactElement(element)) return
  const instance = getElementInstance(element)
  // if element type is Function, instance is null.
  fiberNode.stateNode = instance
  if (element.elementType === 'tag') {
    // should travel children of element if it's a host element
    // or, it depends on whether the developer render children in the JXS template
    const { children } = element
    const validReactNodes = children.filter(isValidReactElement)
    const L = validReactNodes.length
    if (L > 0) {
      const fiberChildNodes = validReactNodes.map(() => {
        const newFiberNode =  new FiberNode(null, null, fiberNode)
        return newFiberNode
      })
      fiberNode.child = fiberChildNodes[0]
      let child = null
      let fiberChildNode = null
      for (let i = 0; i < L; i ++) {
        child = validReactNodes[i]
        fiberChildNode = fiberChildNodes[i]
        if (i < L -1) {
          fiberChildNode.sibling = fiberChildNodes[i + 1]
        }
        walk(child, fiberChildNode)
      }
    }
  } else {
    // what the function return or the method render return is the child of the React Element.
    let _return = null
    if (element.elementType === 'component') {
      _return = instance.render()
    } else {
      const { type, props, children } = element
      _return = type(props, children)
    }
    const fiberChildNode = new FiberNode(null, null, fiberNode)
    walk(_return, fiberChildNode)
  }
}

function render(rootElement, hostElement) {
  fiberTree.root.element = rootElement
  fiberTree.$$container = hostElement
  workLoop(fiberTree.root, buildFiberTree)
  console.log(fiberTree)
}

function Fragment(props, children) {
  throw new Error('Fragment is not implemented')
}

function buildFiberTree(fiberNode) {
  const { element } = fiberNode
  if (!isValidReactElement(element)) return
  const instance = getElementInstance(element)
  fiberNode.stateNode = instance
  const elementType = element.elementType
  if (elementType === 'tag') {
    const { children } = element
    const validReactElements = children.filter(isValidReactElement)
    const L = validReactElements.length
    if (L === 0) return
    const fiberChildNodes = validReactElements.map(child => {
      return new FiberNode(null, null, fiberNode, child)
    })
    fiberNode.child = fiberChildNodes[0]
    let fiberChildNode = null
    for (let i = 0; i < L; i ++) {
      fiberChildNode = fiberChildNodes[i]
      if (i < L -1) {
        fiberChildNode.sibling = fiberChildNodes[i + 1]
      }
    }
  } else if (elementType === 'component') {
    const _return = fiberNode.stateNode.render()
    const fiberChildNode = new FiberNode(null, null, fiberNode, _return)
    fiberNode.child = fiberChildNode
  } else {
    const { props, children, type } = fiberNode.element
    const _return = type(props, children)
    const fiberChildNode = new FiberNode(null, null, fiberNode, _return)
    fiberNode.child = fiberChildNode
  }
}

export {
  Component,
  Fragment,
  createElement,
  render
}
