const REACT_ELEMENT_TYPE = Symbol('React Element')

class Component {
  constructor(props) {
    this.props = props || {}
    this.state = {}
  }

  setState(update) {
  }

  render() {
    return null
  }
}

const elementFactory = (type, props, elementType) => {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    props,
    elementType
  }
  return element
}

function createElement(type, config, ...children) {
  const props = {}
  const typeofString = typeof type
  Object.assign(props, config)
  props.children = children
  if (typeofString === 'string') {
    return elementFactory(type, props, 'tag')
  } else if (typeofString === 'function') {
    if (type.prototype instanceof Component) {
      return elementFactory(type, props, 'component')
    } else {
      return elementFactory(type, props, 'function')
    }
  } else {
    throw new Error(`A valid type: ${typeofString}`)
  }
}

function executeComponent(element) {
  const { type, elementType, props } = element
  switch (elementType) {
    case 'tag': {
      return null
    }
    case 'component': {
      const instance = new type(props)
      return instance.render()
    }
    case 'function': {
      return type(props)
    }
  }
}

/**
 *
 */
function walk(node) {
  const { element } = node
  if (element.$$typeof === REACT_ELEMENT_TYPE) {
    const subTree = executeComponent(element)
    if (subTree !== null) {
      node.child = {
        element: subTree
      }
      walk(node.child)
    }
  }
}

function build(rootElement) {
  const virtualDOM = {
    root: {
      element: rootElement
    }
  }
  walk(virtualDOM.root)
  return virtualDOM
}

function renderNode(node) {
  const { element, child } = node
  const { elementType, props, type } = element
  if (elementType === 'tag') {
    const hostElement = document.createElement(type)
    let propName = null
    for (propName in props) {
      // props.children.forEach(child)
      if (propName in hostElement) {
        hostElement[propName] = props[propName]
      } else {
        hostElement.setAttribute(propName, props[propName])
      }
    }
  } else if (elementType === 'function') {

  } else if (elementType === 'component') {

  }
}

function render(rootElement, hostElement) {
  const dom = build(rootElement)
  // const { root } = dom
  // renderElement()
}

export {
  Component,
  createElement,
  build,
  render
}
