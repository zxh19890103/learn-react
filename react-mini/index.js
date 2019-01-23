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

const element = <Phone>
  <p>It's just a Phone.</p>
</Phone>

ReactDom.render(element, document.getElementById('reactApp'))

console.log(element)
