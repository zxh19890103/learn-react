import ReactDom from 'react-dom'

class Mouse extends React.Component {
  constructor(props) {
    // debugger
    super(props)
    this.state = {
      title: 'Jobs'
    }
    this.hy = React.createRef()
    this.counter = 0
  }

  getSnapshotBeforeUpdate() {
    console.log(arguments)
    return {
      title: 'Singhi'
    }
  }

  // componentWillMount() {
  //   setTimeout(() => {
  //     this.setState({ title: 'Mark' })
  //   }, 100);
  //   console.log('componentWillMount')
  // }

  componentDidUpdate() {
    console.log(arguments)
  }

  // UNSAFE_componentWillMount() {
  //   console.log('UNSAFE_componentWillMount')
  // }

  componentDidMount() {
    this.hy.current.classList.add('hello')
    this.setState({
      title: 'Mao'
    })
  }

  handleClick = () => {
    this.counter ++
    this.setState({
      title: 'Counter' + this.counter
    })
  }

  render() {
    const { title } = this.state
    console.log(title)
    return <h3 ref={this.hy} onClick={this.handleClick}>Hello, {title}</h3>
  }

}

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

const element = <Mouse/>

const container = document.getElementById('reactApp')
ReactDom.render(element, container)

// console.log(element)
// const reactRoot = container._reactRootContainer

// console.log('ReactDom', ReactDom)
// const internalRoot = reactRoot._internalRoot
// console.log(internalRoot)
// const fiberNode = internalRoot.current
// console.log(fiberNode)
