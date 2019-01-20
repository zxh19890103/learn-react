import * as React from './core'

const HelloWorld = (props, children) => {
  const { title } = props
  return <div>
    <h3>I am produced by function, and {title}</h3>
    <p>
    You create a tree of components. React takes this tree, walks through it, and creates a virtual model of the end result. Perhaps you are rendering to the DOM, perhaps you are targeting native. At this point, that doesn’t matter to React.
    </p>
    {children}
  </div>
}

class Bird extends React.Component {
  render() {
    return <HelloWorld title={'Hahahaha'}></HelloWorld>
  }
}

const element = <div>
  <HelloWorld title={'Hey'}>
    <div style="color: red" className="goof" name="Singhi John">Hello, Child</div>
    <Bird/>
    <Bird/>
    <Bird/>
    <Bird/>
  </HelloWorld>
</div>

React.render(element, document.getElementById('reactApp'))
console.log(element)
