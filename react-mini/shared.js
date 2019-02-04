const REACT_ELEMENT_TYPE = Symbol('React Element')

const isValidReactElement = (element) => {
  return element !== null
    && element !== undefined
    && element.$$typeof === REACT_ELEMENT_TYPE
}

const isConstantElement = (element) => {
  const typeofIt = typeof element
  if (element === null ||
      typeofIt === 'string' ||
      typeofIt === 'number' ||
      typeofIt === 'boolean' ||
      typeofIt === 'undefined') {
        return true
  }
  return false
}

const ELEMENT_TAG = {
  hostElement: 0,
  classElement: 1,
  functionElement: 2,
  textElement: 3
}

export  {
  REACT_ELEMENT_TYPE,
  ELEMENT_TAG,
  isValidReactElement,
  isConstantElement
}
