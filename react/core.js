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
    elementType,
    __html: []
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

function renderHTML(element) {
  const { type, elementType, props } = element
  switch (elementType) {
    case 'tag': {
      const hostElement = document.createElement(type)
      let propName = null
      for (propName in props) {
        if (propName === 'children') continue
        if (propName in hostElement) {
          hostElement[propName] = props[propName]
        } else {
          hostElement.setAttribute(propName, props[propName])
        }
      }
      return hostElement
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
 * @param {*} element React Element
 * @param {*} container DOM container
 * @param {*} action How to mount on container
 */
function walk(element) {
  if (element.$$typeof === REACT_ELEMENT_TYPE) {
    // const html = renderHTML(element)
    const children = element.props.children
    children.forEach(walk)
  } else {
    const text = document.createTextNode(element)
    element.__html.push(text)
  }
}

function render(rootInstance, hostElement) {
  walk(rootInstance)
}

export {
  Component,
  createElement,
  render
}
