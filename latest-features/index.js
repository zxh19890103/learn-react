import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'
import * as star from './star'

ReactDOM.render(<App/>, document.getElementById('reactApp'))

// macrotasks: setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering
// microtasks: process.nextTick, Promises, Object.observe, MutationObserver

setTimeout(() => {
  console.log('setTimeout')
}, 0)
setTimeout(() => {
  console.log('setTimeout 2s later.')
}, 2 * 1000)
Promise.resolve().then(() => {
  console.log('Promise')
})
requestAnimationFrame(() => {
  console.log('requestAnimationFrame')
})
console.log('Script')
star.setName('Sing')
console.log(star.default)
console.log(star.name)
