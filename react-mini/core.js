const REACT_ELEMENT_TYPE = Symbol('React Element')

function createElement(type, config, ...children) {
  const props = { }
  Object.assign(props, config)
  props.children = children
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    props
  }
}

export {
  REACT_ELEMENT_TYPE,
  createElement
}
