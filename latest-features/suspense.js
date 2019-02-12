import * as React from 'react'
const RemoteComponent = React.lazy(() => import('./remote-component'));

export default (props) => {
  const [sum, dispatch] = React.useReducer((pre, next) => {
    const rand = (Math.random() * 100000000).toString(16).substr(0,6)
    return rand
  }, '98bace')
  const alphaSum = React.useMemo(() => {
    // console.log('sum is changed')
    return `#${sum}11`
  }, [sum])
  // console.log(alphaSum)
  return <div style={{border: '1px solid #DDD', padding: '12px'}} onClick={() => {
    dispatch({ payload: 90 })
  }}>
    <h1 style={{backgroundColor: alphaSum}}>{sum}</h1>
    <RemoteComponent name={props.name}/>
  </div>
}
