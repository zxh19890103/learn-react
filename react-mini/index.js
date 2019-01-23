// import * as React from './core'
import * as React from 'react'
import ReactDom from 'react-dom'

function Phone(props) {
  const { name, descriprion, children } = props
  return <div>
    <h4>{name}</h4>
    <p>
      {descriprion}
    </p>
    {children}
  </div>
}

const element = [<Phone key="phone">
  <p>It's just a Phone.</p>
</Phone>, <h3 key="node">Hello, H3</h3>]

const container = document.getElementById('reactApp')
ReactDom.render(element, container)

console.log(element)
const reactRoot = container._reactRootContainer

console.log('ReactDom', ReactDom)
const internalRoot = reactRoot._internalRoot
console.log(internalRoot)
const fiberNode = internalRoot.current
console.log(fiberNode)
