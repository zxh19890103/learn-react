import * as React from './core'

const HelloWorld = (props) => {
  const { title, children } = props
  return <div>
    <h3>I am produced by function, and {title}</h3>
    <p>
    You create a tree of components. React takes this tree, walks through it, and creates a virtual model of the end result. Perhaps you are rendering to the DOM, perhaps you are targeting native. At this point, that doesn’t matter to React.
    </p>
    {children}
  </div>
}

const element =
<HelloWorld title={'Hey'}>
  <a href="https://jd.com">JD</a>
</HelloWorld>

const vn = React.render(element)
console.log(vn)
