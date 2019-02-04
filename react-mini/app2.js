import { Component, renderRoot, commitRoot } from './core'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Hello, World'
    }
  }
  handleClick = () => {
    this.setState({
      title: 'Hello, React'
    })
  }
  render() {
    return <h3 onClick={this.handleClick} style={ { backgroundColor: 'cyan' } }>
      h3:// {this.state.title}
      <span> span:// Append text</span>
    </h3>
  }
}

function Footer({ copyRight }) {
  return <footer style={{ borderTop: '1px solid #898989', textAlign: 'center' }}>
    footer:// CopyRight: {copyRight}
  </footer>
}

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div id="hahahahaha">
      div://
      <Header/>
      <p>
        p://
        The body part of this application
      </p>
      <Footer copyRight="SinghiJohn"/>
    </div>
  }
}

const DOMContainer = document.getElementById('reactApp')

renderRoot(<App/>, DOMContainer)

setTimeout(() => {
  commitRoot(DOMContainer)
}, 100)
