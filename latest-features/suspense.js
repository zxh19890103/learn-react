import * as React from 'react'
const RemoteComponent = React.lazy(() => import('./remote-component'));

export default (props) => {
  return <div>
    <RemoteComponent name={props.name}/>
  </div>
}
