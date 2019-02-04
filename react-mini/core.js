import {
  REACT_ELEMENT_TYPE,
  ELEMENT_TAG
} from './shared'
import { startWorkLoopFromElement } from './fiber'
import { updateQueue } from './updateQueue'

function createElement(type, config, ...children) {
  const props = { }
  Object.assign(props, config)
  props.children = children
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    props,
    tag: getTagOfElement({ type })
  }
}

function getTagOfElement(element) {
  const type = element.type
  const typeofIt = typeof type
  if (typeofIt === 'string') {
    return ELEMENT_TAG.hostElement
  } else if (typeofIt === 'function') {
    if (type.prototype instanceof Component) {
      return ELEMENT_TAG.classElement
    } else {
      return ELEMENT_TAG.functionElement
    }
  } else {
    throw new Error(`No type "${typeofIt}" for Element.`)
  }
}

class Component {
  constructor(props) {
    this.props = props
    this.state = {}
  }

  setState(partialState) {
    const updater = this._updater
    if (!updater.updateQueue) {
      updater.updateQueue = new updateQueue(partialState)
    } else {
      updater.updateQueue.appendUpdate(partialState)
    }
  }

  render() {
    throw new Error('You shouldn\'t use this base component directly.')
  }
}

function renderRoot(rootElement, DOMContainer) {
  const fiberRoot = startWorkLoopFromElement(rootElement)
  DOMContainer._internalRoot = {
    current: fiberRoot
  }
}

function commitRoot(DOMContainer) {
  const fiberRoot = DOMContainer._internalRoot.current
  // all at once flush
  let nextEffectFiber = fiberRoot
  let safe = 0
  while (nextEffectFiber !== null && safe < 100) {
    safe ++
    // apply effect
    const {
      tag,
      stateNode,
      pendingProps
    } = nextEffectFiber
    switch (tag) {
      case ELEMENT_TAG.hostElement: {
        // it's host element
        // mount it to the parent element
        // where is the parent element
        const parentElement = findDOMContainer(nextEffectFiber, DOMContainer)
        setDOMProperties(stateNode, pendingProps) // applied
        parentElement.appendChild(stateNode)
        break
      }
      case ELEMENT_TAG.classElement: {
        // it's class element
        // call lifecycles
        break
      }
      case ELEMENT_TAG.textElement: {
        const parentElement = findDOMContainer(nextEffectFiber, DOMContainer)
        parentElement.appendChild(stateNode)
        break
      }
      case ELEMENT_TAG.functionElement: {
        // it's functional element
        // nothing todo
        break
      }
    }
    console.log(nextEffectFiber.toString())
    nextEffectFiber.memoizedProps = pendingProps
    nextEffectFiber.pendingProps = null
    nextEffectFiber = nextEffectFiber.nextEffect
  }
}

function setDOMProperties(element, props) {
  Object.keys(props).forEach(key => {
    if (key === 'children') return
    const val = props[key]
    const oProp = element[key]
    if (!key.startsWith('on') && oProp === undefined) {
      element.setAttribute(`data-${key}`, val)
    } else {
      const typeofProp = typeof val
      switch (typeofProp) {
        case 'number':
        case 'string':
        case 'boolean': {
          element[key] = val
          break
        }
        case 'object': {
          if (val === null) {
            break
          }
          // e.g. style etc.
          for (let innerKey in val) {
            oProp[innerKey] = val[innerKey]
          }
          break
        }
        case 'function': {
          if (!key.startsWith('on')) {
            break
          }
          addEventListener(element, key, val)
          break
        }
        default: {
          // ignore
          break
        }
      }
    }
  })
}

function addEventListener(element, type, handler) {
  const eventType = type.substr(2).toLowerCase()
  element.addEventListener(eventType, handler)
}

function findDOMContainer(fiber, domRoot) {
  fiber = fiber.return
  while (fiber) {
    if (fiber.tag === 0) {
      return fiber.stateNode
    } else {
      fiber = fiber.return
      continue
    }
  }
  return domRoot
}

export {
  createElement,
  Component,
  renderRoot,
  commitRoot
}
