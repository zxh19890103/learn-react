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
    return <>
      <HelloWorld title={'Hahahaha'}></HelloWorld>
      <p style="color: cyan;">
        Hooks are an upcoming feature that lets you use state and other React features without writing a class. They’re currently in React v16.8.0-alpha.0.
      </p>
    </>
  }
}

const rootElement = <div>
  <HelloWorld title={'Hey'}>
    <div style="color: red" className="goof" name="Singhi John">Hello, Child</div>
    <Bird/>
  </HelloWorld>
</div>

React.render(rootElement, document.getElementById('reactApp'))
console.log(rootElement)
