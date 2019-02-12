import * as React from 'react'
import 'querystring'
import 'q'

export default (props) => {
  return <h4>I am a component from remote. -- {props.name}</h4>
}
