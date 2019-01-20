import {
  fiberTree,
  FiberNode
} from './fiber'

import {
  isValidDOMElement,
  isValidReactElement,
  REACT_ELEMENT_TYPE
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
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    $$return: null,
    $$el: null,
    type,
    props,
    children,
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

function executeComponent(element) {
  const { type, elementType, props, children } = element
  switch (elementType) {
    case 'tag': {
      return null
    }
    case 'component': {
      const instance = new type(props, children)
      return instance.render()
    }
    case 'function': {
      return type(props, children)
    }
  }
}

function walk(element, fiberNode) {
  if (isValidReactElement(element)) {
    fiberNode.stateNode = element
    const { children } = element
    const validReactNodes = children.filter(isValidReactElement)
    const L = validReactNodes.length
    if (L >0) {
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
    const $$return = executeComponent(element)
    if ($$return !== null) {
      element.$$return = $$return
      const fiberChildNode = new FiberNode(null, null, fiberNode)
      walk($$return, fiberChildNode)
    }
  }
}

function mountElement(element, mountTo) {
  if (isValidReactElement(element)) {
    const { elementType, props, type, children } = element
    if (elementType === 'tag') {
      const hostElement = document.createElement(type)
      let propName = null
      for (propName in props) {
        if (propName in hostElement) {
          hostElement[propName] = props[propName]
        } else {
          hostElement.setAttribute(propName, props[propName])
        }
      }
      mountTo.appendChild(hostElement)
      element.$$el = hostElement
      children.forEach((subElement) => {
        mountElement(subElement, hostElement)
      })
    } else {
      const $$return = element.$$return
      if ($$return !== null) {
        mountElement($$return, mountTo)
      }
    }
  } else {
    const typeofExpr = typeof element
    if (typeofExpr === 'object') {
      if (element instanceof Array) {
        element.forEach((el) => {
          mountElement(el, mountTo)
        })
      } else {
        console.log('What else will it be ?')
      }
    } else if (typeofExpr === 'string') {
      const text = document.createTextNode(element)
      mountTo.appendChild(text)
    }
  }
}

function render(rootElement, hostElement) {
  walk(rootElement, fiberTree)
  mountElement(rootElement, hostElement)
  console.log(fiberTree)
}

function Fragment(props, children) {
  return children
}

export {
  Component,
  Fragment,
  createElement,
  render
}
