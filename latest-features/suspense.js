import * as React from 'react'
const val = import('./remote-component')
const RemoteView = React.lazy(() => new Promise((resolve) => {
  setTimeout(() => {
    val.then(resolve)
  }, 3000)
}))

export default (props) => {
  return <div>
    <RemoteView name={props.name}/>
  </div>
}
