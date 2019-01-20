const REACT_ELEMENT_TYPE = Symbol('React Element')
const REACT_FUNCTION_ELEMENT = Symbol('React Funcational Element')

const isValidDOMElement = (element) => {
  return element instanceof Element
}

const isValidReactElement = (element) => {
  return element !== null
    && element !== undefined
    && element.$$typeof === REACT_ELEMENT_TYPE
}

export {
  REACT_ELEMENT_TYPE,
  REACT_FUNCTION_ELEMENT,
  isValidReactElement,
  isValidDOMElement
}
