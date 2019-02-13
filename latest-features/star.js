let name = 'Singhi'
let age = 28

const setName = (val) => {
  name = val
}

setTimeout(() => {
  console.log(name)
}, 1000);

export default age

export {
  name,
  setName
}
