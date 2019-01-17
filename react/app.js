import * as React from './core'

const HelloWorld = (props) => {
  const { title } = props
  return <div>
    <h3>I am produced by function, and {title}</h3>
  </div>
}

const element = <HelloWorld title={'Hey'}/>
React.render(element, document.getElementById('reactApp'))
console.log(element)
