import ReactDom from 'react-dom'
import app from './app'
console.log('App init')
console.log(app)

const o = {
  name: 'Singhi',
  age: 30
}

const o2 = {
  ...o
}

console.log(o2)

ReactDom.render(app, document.getElementById('reactApp'))
