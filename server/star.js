module.exports = {
  name: 'Star'
}

console.log(exports)
console.log(module.exports)

setTimeout(() => {
  console.log(module.exports.name)
}, 5 * 1000)
