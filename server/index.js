const star = require('./star')
star.name = 'Moon'
setTimeout(() => {
  console.log('setTimeout')
}, 0)
setTimeout(() => {
  console.log('setTimeout 2s later.')
}, 2 * 1000)
new Promise((resolve, reject) => {
  setTimeout(resolve, 0)
}).then(r => {
  console.log('Promise')
})
console.log('Script')
