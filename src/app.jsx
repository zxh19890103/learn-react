import React from 'react'
import { Com } from './com.class'
import ComFunc from './com.func'

const ref = React.createRef()
const element =
<div ref={ref}>
  <h3>Learn React</h3>
  <p>
    In order to accept your pull request, we need you to submit a CLA. You only need to do this once, so if you’ve done this for another Facebook open source project, you’re good to go. If you are submitting a pull request for the first time, just let us know that you have completed the CLA and we can cross-check with your GitHub username.
  </p>
  <Com name="Singhi John" age={30}/>
  <ComFunc/>
</div>

export default element
