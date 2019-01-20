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
    return <div>
      <HelloWorld title={'Hahahaha'}></HelloWorld>
      <p style="color: cyan;">
        Hooks are an upcoming feature that lets you use state and other React features without writing a class. They’re currently in React v16.8.0-alpha.0.
      </p>
    </div>
  }
}

const rootElement = <div>
  <h4 style="color: skyblue">Hello, World</h4>
  <Bird/>
  <HelloWorld>
    <h3>Hahaga</h3>
  </HelloWorld>
</div>

React.render(rootElement, document.getElementById('reactApp'))
